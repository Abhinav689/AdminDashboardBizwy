import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Dashboard from "./company/dashboard";
import Team from "./company/team";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [theme, colorMode] = useMode();
  const routesArray = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/company",
      element: <Team />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>  
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
