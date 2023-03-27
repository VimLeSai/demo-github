import React from 'react';
import { Box } from '@mui/material';
import LatestIssues from './components/issues';
import LatestPullRequests from './components/pull-requests';

const Dashboard = () => {
  return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
      >
        <Box sx={{ mb: 4, width: '100%' }}>
          <LatestPullRequests />
        </Box>
        <Box sx={{ mb: 4, width: '100%' }}>
          <LatestIssues />
        </Box>
      </Box>
  );
};

export default Dashboard;
