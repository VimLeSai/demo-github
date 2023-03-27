import {
  Box,
  Button, Typography
} from '@mui/material';
import useGithubListing from 'hooks/use-github-listing';
import { Link } from 'react-router-dom';
import { routes } from 'routes/paths';
import PullRequestList from 'shared/pull-request/list';

const LatestPullRequests = () => {
  const { list =[], loading, error } = useGithubListing({
    page: 1,
    limit: 5,
  })

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
        <Typography variant="h4">Pull Requests</Typography>
        <Button variant="outlined" component={Link} to={routes.pullRequests}>
          View All
        </Button>
      </Box>
      <PullRequestList pullRequests={list} loading={loading} error={error}/>
    </>
  );
};

export default LatestPullRequests;
