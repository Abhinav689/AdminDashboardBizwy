import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState } from "react";
import Topbar from "../Sidebars/Topbar";
import Sidebar from "../Sidebars/Sidebar";
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const displayName = currentUser?.displayName || username || 'User';

  return (
    <Box display="flex">
      {/* SIDEBAR */}
      <Sidebar isSidebar={isSidebar} />

      <Box flex={1} display="flex" flexDirection="column">
        {/* TOPBAR */}
        <Topbar setIsSidebar={setIsSidebar} />

        <Box m="20px" flex={1}>
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle={`Welcome, ${displayName}!`} />

            <Box>
           
            </Box>
          </Box>

        
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
