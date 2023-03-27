import { Box, Pagination, Typography } from '@mui/material';
import useGithubListing from 'hooks/use-github-listing';
import ListingFilters from 'shared/filters';
import GoBack from 'shared/go-back';
import PullRequestList from 'shared/pull-request/list';

const PullRequestListView = () => {
  const { loading, list, error, pagination, setPage, setQueryData } = useGithubListing({
    query: {
      state: 'open',
    },
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        margin: 'auto',
        marginTop: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Pull Requests <GoBack />
      </Typography>
      <ListingFilters list={list} setQueryData={setQueryData} loading={loading} />
      <PullRequestList pullRequests={list} loading={loading} error={error} />
      {Boolean(list.length) && (
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default PullRequestListView;
