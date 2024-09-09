<Typography variant="h4" sx={{ mb: 2, color: "#fff", marginTop: "-8rem" , marginLeft:"-10rem"}}>
Organization Details
</Typography>
<TextField
fullWidth
label="Name of Company"
name="companyName"
value={formData.companyName || ''}
onChange={handleChange}
variant="outlined"
margin="normal"
sx={{
"& .MuiInputBase-input": { color: "#fff" }, // Input text color
"& .MuiFormLabel-root": { color: "rgba(255, 255, 255, 0.7)" }, // Default label color
"& .MuiFormLabel-root.Mui-focused": { color: "#fff" }, // Label color when focused
"& .MuiOutlinedInput-root": {
"& fieldset": { borderColor: "#333" }, // Outline color
"&:hover fieldset": { borderColor: "#555" }, // Outline color on hover
"&.Mui-focused fieldset": { borderColor: "#fff" }, // Outline color when focused
backgroundColor: "#333",
},
ml: "-4rem"
}}
InputLabelProps={{
style: { color: 'white' } // Ensure the initial label color is white
}}
/>

<select
label="companyType"
value={formData.companyType}
onChange={handleInputChange}
style={{
width: '100%',
padding: '10px',
borderRadius: '4px',
backgroundColor: '#333',
borderColor: '#fff',
color: '#fff',
backgroundRepeat: 'no-repeat',
marginLeft: "-4rem",
marginTop: "1rem",
height: "6vh",
}}
>
<option value="" disabled selected hidden>
Type of Company
</option>
<option value="Private Limited">Private Limited</option>
<option value="Public Limited">Public Limited</option>
<option value="Partnership">Partnership</option>
<option value="Sole Proprietorship">Sole Proprietorship</option>
</select>

  <TextField
    label="Phone Number"
    name="phoneNumber"
    value={formData.phoneNumber || ''}
    onChange={handleChange}
    variant="outlined"
    margin="normal"
    style={{width:"48%"}}
    sx={{
      "& .MuiInputBase-input": { color: "#fff" }, // Input text color
      "& .MuiFormLabel-root": { color: "rgba(255, 255, 255, 0.7)" }, // Default label color
      "& .MuiFormLabel-root.Mui-focused": { color: "#fff" }, // Label color when focused
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#333" }, // Outline color
        "&:hover fieldset": { borderColor: "#555" }, // Outline color on hover
        "&.Mui-focused fieldset": { borderColor: "#fff" }, // Outline color when focused
        backgroundColor: "#333",
      },
      ml: "-49rem",
      mt:"1.5rem"
      
    }}
    InputLabelProps={{
      style: { color: 'white' } // Ensure the initial label color is white
    }}
  />
  <TextField
    label="Email Address"
    name="email"
    value={formData.email || ''}
    onChange={handleChange}
    variant="outlined"
    margin="normal"
    sx={{
      "& .MuiInputBase-input": { color: "#fff" }, // Input text color
      "& .MuiFormLabel-root": { color: "rgba(255, 255, 255, 0.7)" }, // Default label color
      "& .MuiFormLabel-root.Mui-focused": { color: "#fff" }, // Label color when focused
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#333" }, // Outline color
        "&:hover fieldset": { borderColor: "#555" }, // Outline color on hover
        "&.Mui-focused fieldset": { borderColor: "#fff" }, // Outline color when focused
        backgroundColor: "#333",
      },
      ml: "39rem",
      mt:"-3.7rem"
    }}
    style={{width:"50%"}}
    InputLabelProps={{
      style: { color: 'white' } // Ensure the initial label color is white
    }}
  />
  <select
label="Time Zone"
value={formData.timeZone || ''}
onChange={handleInputChange2}
style={{
width: '100%',
padding: '10px',
borderRadius: '4px',
backgroundColor: '#333',
borderColor: '#fff',
color: '#fff',
backgroundRepeat: 'no-repeat',
marginLeft: "-4rem",
marginTop: "1rem",
height: "6vh",
}}
>
<option value="" disabled selected hidden>
Select Time Zone
</option>
<option value="North America">(GMT-02:00) Pacific, Hawaii</option>
<option value="South America">(GMT-03:00) Pacific, Alabama</option>
<option value="Europe">(GMT-04:00) Pacific, Texas</option>
<option value="Asia">(GMT-05:00) America, Los Angels</option>
<option value="Asia">(GMT-06:00) America, Washington</option>
<option value="Asia">(GMT-07:00) America, Dallas</option>
<option value="Asia">(GMT-08:00) Europe, paris</option>
<option value="Asia">(GMT-09:00) Europe, London</option>
<option value="Asia">(GMT-10:00) Europe, Norway</option>
<option value="Asia">(GMT-11:00) Africa, Dubai</option>
<option value="Asia">(GMT-12:00) Africa, Madagascar</option>
<option value="Asia">(GMT-13:00) Asia, India ,Chennai</option>
<option value="Asia">(GMT-13:30) Asia, India ,Mumbai</option>
<option value="Asia">(GMT-13:40) Asia, India ,Kolkata</option>
<option value="Asia">(GMT-13:35) Asia, India ,New Delhi</option>
<option value="Asia">(GMT-14:00) Asia, Pakistan </option>
<option value="Asia">(GMT-15:00) Asia, China ,Beiging</option>
<option value="Asia">(GMT-16:00) Asia, Japan ,Tokyo</option>

</select>

  
  <Typography variant="h5" sx={{ color: "#fff", mt: 4, ml: "-10rem",mb:2 }}>Working Time</Typography>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
<Stack
spacing={0}
sx={{
display: "flex",
flexDirection: "row",
gap: "2rem",
marginLeft: "-10rem",
marginTop: "1rem",
}}
>
<TimePicker
label="Opening Time"
value={openingTime}
onChange={(newValue) => setOpeningTime(newValue)}
renderInput={(params) => (
<TextField
  {...params}
  variant="outlined"
  sx={{
    "& .MuiInputBase-input": { color: "#fff" }, // Input text color
    "& .MuiFormLabel-root": { color: "rgba(255, 255, 255, 0.7)" }, // Default label color
    "& .MuiFormLabel-root.Mui-focused": { color: "#fff" }, // Label color when focused
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#333" }, // Outline color
      "&:hover fieldset": { borderColor: "#555" }, // Outline color on hover
      "&.Mui-focused fieldset": { borderColor: "#fff" }, // Outline color when focused
      backgroundColor: "#333",
    },
  }}
/>
)}
/>
<TimePicker
label="Closing Time"
value={closingTime}
onChange={(newValue) => setClosingTime(newValue)}
renderInput={(params) => (
<TextField
  {...params}
  variant="outlined"
  sx={{
    "& .MuiInputBase-input": { color: "#fff" }, // Input text color
    "& .MuiFormLabel-root": { color: "rgba(255, 255, 255, 0.7)" }, // Default label color
    "& .MuiFormLabel-root.Mui-focused": { color: "#fff" }, // Label color when focused
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#333" }, // Outline color
      "&:hover fieldset": { borderColor: "#555" }, // Outline color on hover
      "&.Mui-focused fieldset": { borderColor: "#fff" }, // Outline color when focused
      backgroundColor: "#333",
    },
  }}
/>
)}
/>
</Stack>
</LocalizationProvider>
  <Typography variant="h5" sx={{ color: "#fff", mt: 4, ml: "-10rem" }}>Working Days</Typography>
  <FormGroup sx={{ ml: "-7rem" ,mt:"1rem"}} style={{display:"flex", flexDirection:"row"}}>
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('All') || false} onChange={(e) => handleCheckboxChange(e, 'All')} />} label="All" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Monday') || false} onChange={(e) => handleCheckboxChange(e, 'Monday')} />} label="Monday" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Tuesday') || false} onChange={(e) => handleCheckboxChange(e, 'Tuesday')} />} label="Tuesday" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Wednesday') || false} onChange={(e) => handleCheckboxChange(e, 'Wednesday')} />} label="Wednesday" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Thursday') || false} onChange={(e) => handleCheckboxChange(e, 'Thursday')} />} label="Thursday" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Friday') || false} onChange={(e) => handleCheckboxChange(e, 'Friday')} />} label="Friday" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Saturday') || false} onChange={(e) => handleCheckboxChange(e, 'Saturday')} />} label="Saturday" />
    <FormControlLabel control={<CustomCheckbox checked={formData.workingDays?.includes('Sunday') || false} onChange={(e) => handleCheckboxChange(e, 'Sunday')} />} label="Sunday" />
  </FormGroup>
</>

)}
{activeStep === 1 && (
<>
<React.Fragment>
<Button variant="filled" onClick={handleClickOpen}>
Add Address
</Button>

<table style={styles.table}>
<thead style={styles.tableHead}>
<tr>
<th style={styles.tableHeader}>ID</th>
<th style={styles.tableHeader}>Type</th>
<th style={styles.tableHeader}>Phone Number</th>
<th style={styles.tableHeader}>Email</th>
<th style={styles.tableHeader}>Address</th>
<th style={styles.tableHeader}>Actions</th>
</tr>
</thead>
<tbody>
{addresses.map((addr, index) => (
<tr key={index} style={styles.tableRow}>
  <td style={styles.tableCell}><input type="checkbox" /></td>
  <td style={styles.tableCell}>{addr.branchType}</td>
  <td style={styles.tableCell}>{addr.phoneNumber}</td>
  <td style={styles.tableCell}>{addr.email}</td>
  <td style={styles.tableCell}>{addr.address}</td>
  <td style={styles.tableCell}>
    <IconButton onClick={() => handleEditClickOpen(index)}><EditIcon /></IconButton>
    <IconButton onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
  </td>
</tr>
))}
</tbody>
</table>

<Dialog onClose={handleClose} open={open}>
<DialogTitle>
{isEditing ? 'Edit Address' : 'Add Address'}
<IconButton
aria-label="close"
onClick={handleClose}
style={{ position: 'absolute', right: 8, top: 8 }}
>
<CloseIcon />
</IconButton>
</DialogTitle>
<DialogContent dividers>
<FormControl fullWidth margin="normal">
<InputLabel id="branchType-label">Branch Type</InputLabel>
<Select
  labelId="branchType-label"
  name="branchType"
  value={formData.branchType}
  onChange={handleChange1}
  fullWidth
>
  <option value="Branch 1">Branch 1</option>
  <option value="Branch 2">Branch 2</option>
  <option value="Branch 3">Branch 3</option>
  <option value="Branch 4">Branch 4</option>
</Select>
</FormControl>
<TextField
label="Business Name"
name="businessName"
value={formData.businessName}
onChange={handleChange1}
fullWidth
margin="normal"
/>
<TextField
label="Address"
name="address"
value={formData.address}
onChange={handleChange1}
fullWidth
margin="normal"
/>
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
<FormControl style={{ flex: 1, marginRight: 8 }}>
  <InputLabel id="country-label">Country</InputLabel>
  <Select
    labelId="country-label"
    name="country"
    value={formData.country}
    onChange={handleChange1}
    fullWidth
  >
    <option value="Country 1">Country 1</option>
    <option value="Country 2">Country 2</option>
  </Select>
</FormControl>
<FormControl style={{ flex: 1, marginLeft: 8 }}>
  <InputLabel id="state-label">State</InputLabel>
  <Select
    labelId="state-label"
    name="state"
    value={formData.state}
    onChange={handleChange1}
    fullWidth
  >
    <option value="State 1">State 1</option>
    <option value="State 2">State 2</option>
  </Select>
</FormControl>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
<FormControl style={{ flex: 1, marginRight: 8 }}>
  <InputLabel id="city-label">City</InputLabel>
  <Select
    labelId="city-label"
    name="city"
    value={formData.city}
    onChange={handleChange1}
    fullWidth
  >
    <option value="City 1">City 1</option>
    <option value="City 2">City 2</option>
  </Select>
</FormControl>
<TextField
  label="Pincode"
  name="pincode"
  value={formData.pincode}
  onChange={handleChange1}
  fullWidth
  margin="normal"
  style={{ flex: 1, marginLeft: 8 , marginTop:"-1rem" }}
/>
</div>
</DialogContent>
<DialogActions>
<Button onClick={handleSave}>
{isEditing ? 'Save Changes' : 'Add Address'}
</Button>
</DialogActions>
</Dialog>
</React.Fragment>
