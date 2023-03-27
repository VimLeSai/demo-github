import {
  Box,
  Button, Typography
} from '@mui/material';
import useGithubListing from 'hooks/use-github-listing';
import { Link } from 'react-router-dom';
import { routes } from 'routes/paths';
import IssueList from 'shared/issue/list';

const LatestIssues = () => {
  const {
    list = [],
    loading,
    error,
  } = useGithubListing({
    page: 1,
    limit: 5,
    type: 'issues',
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4">Issues</Typography>
        <Button variant="outlined" component={Link} to={routes.issues}>
          View All
        </Button>
      </Box>
      <IssueList issues={list} loading={loading} error={error} />
    </>
  );
};

export default LatestIssues;
