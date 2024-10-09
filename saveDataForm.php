<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Prepare a response array for consistency
$response = ['success' => false, 'message' => '', 'data' => []];

// Define upload directory for images
$uploadDir = 'uploads/';

// Ensure the upload directory exists and is writable
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
} elseif (!is_writable($uploadDir)) {
    chmod($uploadDir, 0777);
}

try {
    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bizwy"; // Replace with your database name

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Check request method
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // POST request - insert data

        // Retrieve and sanitize text data from $_POST
        $name = htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8');
        $email = htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8');
        $phone = htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8');
        $businessType = htmlspecialchars($_POST['businessType'] ?? '', ENT_QUOTES, 'UTF-8');
        $timeZone = htmlspecialchars($_POST['timeZone'] ?? '', ENT_QUOTES, 'UTF-8');
        $openingTime = htmlspecialchars($_POST['openingTime'] ?? '', ENT_QUOTES, 'UTF-8');
        $closingTime = htmlspecialchars($_POST['closingTime'] ?? '', ENT_QUOTES, 'UTF-8');
        $workingDays = htmlspecialchars($_POST['workingDays'] ?? '', ENT_QUOTES, 'UTF-8');
        $description = htmlspecialchars($_POST['description'] ?? '', ENT_QUOTES, 'UTF-8');
        $currency = htmlspecialchars($_POST['currency'] ?? '', ENT_QUOTES, 'UTF-8');

        // Notifications
        $customerNotification = isset($_POST['customerNotification']) ? 1 : 0;
        $employeeNotification = isset($_POST['employeeNotification']) ? 1 : 0;
        $customNotification = isset($_POST['customNotification']) ? 1 : 0;

        // Numbers: Aadhar, PAN, GST (as strings)
        $aadharNumber = htmlspecialchars($_POST['aadharNumber'] ?? '', ENT_QUOTES, 'UTF-8');
        $panNumber = htmlspecialchars($_POST['panNumber'] ?? '', ENT_QUOTES, 'UTF-8');
        $gstNumber = htmlspecialchars($_POST['gstNumber'] ?? '', ENT_QUOTES, 'UTF-8');

        // Handle instorePayments and integrations (sent as JSON arrays)
        $instorePayments = isset($_POST['instorePayments']) ? json_decode($_POST['instorePayments'], true) : [];
        $integrations = isset($_POST['integrations']) ? json_decode($_POST['integrations'], true) : [];

        // Convert the arrays back to strings to store in the database
        $instorePayments = !empty($instorePayments) ? implode(', ', $instorePayments) : '';
        $integrations = !empty($integrations) ? implode(', ', $integrations) : '';

        // Initialize image file paths
        $profileLogoPath = '';
        $profileBannerPath = '';
        $aadharImagePath = '';
        $panImagePath = '';
        $gstImagePath = '';

        // Function to handle image uploads with error checking
        function handleImageUpload($fileInput, $uploadDir) {
            if (isset($_FILES[$fileInput]) && $_FILES[$fileInput]['error'] == 0) {
                $imageTmp = $_FILES[$fileInput]['tmp_name'];
                $imageName = basename($_FILES[$fileInput]['name']);
                $imagePath = $uploadDir . $imageName;

                // Move the uploaded file to the designated directory
                if (move_uploaded_file($imageTmp, $imagePath)) {
                    return $imagePath;
                } else {
                    throw new Exception("Failed to upload image: " . $imageName);
                }
            } else if (isset($_FILES[$fileInput]) && $_FILES[$fileInput]['error'] != UPLOAD_ERR_NO_FILE) {
                // Catch other upload errors (like size limit exceeded)
                throw new Exception("Error uploading " . $fileInput . ": " . $_FILES[$fileInput]['error']);
            }
            return ''; // Return empty string if no image was uploaded
        }

        // Handle each image upload
        $profileLogoPath = handleImageUpload('profileLogo', $uploadDir);
        $profileBannerPath = handleImageUpload('profileBanner', $uploadDir);
        $aadharImagePath = handleImageUpload('aadharImage', $uploadDir);
        $panImagePath = handleImageUpload('panImage', $uploadDir);
        $gstImagePath = handleImageUpload('gstImage', $uploadDir);

        // Insert business information into the database
        $sql = $conn->prepare(
            "INSERT INTO business_information (
                name, email, phone, business_type, time_zone, opening_time, closing_time, working_days, 
                profile_logo, profile_banner, description, currency, instore_payments, integrations,
                customer_notification, employee_notification, custom_notification, aadhar_number, pan_number, gst_number, 
                aadhar_image, pan_image, gst_image
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );

        if (!$sql) {
            throw new Exception("SQL Error: " . $conn->error);
        }

        // Bind parameters to the statement
        $sql->bind_param(
            'ssssssssssssssiiiisssss',
            $name, $email, $phone, $businessType, $timeZone, $openingTime, $closingTime, $workingDays,
            $profileLogoPath, $profileBannerPath, $description, $currency, $instorePayments, $integrations,
            $customerNotification, $employeeNotification, $customNotification, $aadharNumber, $panNumber, $gstNumber,
            $aadharImagePath, $panImagePath, $gstImagePath
        );

        // Execute the query and check if successful
        if ($sql->execute()) {
            $businessId = $conn->insert_id; // Get the last inserted business ID

            // Handle branch information (from JSON format)
            if (isset($_POST['branches'])) {
                $branches = json_decode($_POST['branches'], true);

                // Insert branch information into branches table
                foreach ($branches as $branch) {
                    $branchType = htmlspecialchars($branch['branchType'] ?? '', ENT_QUOTES, 'UTF-8');
                    $branchBusinessName = htmlspecialchars($branch['businessName'] ?? '', ENT_QUOTES, 'UTF-8');
                    $branchAddress = htmlspecialchars($branch['address'] ?? '', ENT_QUOTES, 'UTF-8');
                    $branchCountry = htmlspecialchars($branch['country'] ?? '', ENT_QUOTES, 'UTF-8');
                    $branchState = htmlspecialchars($branch['state'] ?? '', ENT_QUOTES, 'UTF-8');
                    $branchCity = htmlspecialchars($branch['city'] ?? '', ENT_QUOTES, 'UTF-8');
                    $branchPincode = htmlspecialchars($branch['pincode'] ?? '', ENT_QUOTES, 'UTF-8');

                    $branchSql = $conn->prepare(
                        "INSERT INTO branches (business_id, branch_type, branch_business_name, branch_address, branch_country, branch_state, branch_city, branch_pincode)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
                    );
                    $branchSql->bind_param('isssssss', $businessId, $branchType, $branchBusinessName, $branchAddress, $branchCountry, $branchState, $branchCity, $branchPincode);
                    $branchSql->execute();
                }
            }

            // If everything is successful, return a success response
            $response['success'] = true;
            $response['message'] = 'Business, branches, and images inserted successfully!';
        } else {
            throw new Exception("Error inserting business information: " . $sql->error);
        }
    } elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
        // GET request - retrieve data

        // Fetch business and branch information
        $sql = "SELECT 
                    b.id AS business_id,
                    b.name AS business_name,
                    b.profile_banner AS profile_banner,
                    br.branch_type AS branch_type,
                    br.branch_business_name AS branch_name,
                    br.branch_address AS address,
                    br.branch_state AS state,
                    br.branch_city AS city
                FROM business_information b
                LEFT JOIN branches br ON b.id = br.business_id";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $businessData = [];

            // Loop through the results
            while ($row = $result->fetch_assoc()) {
                $businessData[] = [
                    'businessId' => $row['business_id'],
                    'businessName' => $row['business_name'],
                    'profileBanner' => $row['profile_banner'],
                    'branchType' => $row['branch_type'],
                    'branchName' => $row['branch_name'],
                    'address' => $row['address'],
                    'state' => $row['state'],
                    'city' => $row['city']
                ];
            }

            // Set success response and data
            $response['success'] = true;
            $response['data'] = $businessData;
        } else {
            $response['message'] = 'No businesses found';
        }
    } else {
        throw new Exception('Invalid request method');
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

// Close the connection
$conn->close();

// Return the response as JSON
echo json_encode($response);
?>
