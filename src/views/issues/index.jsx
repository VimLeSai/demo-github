import {
  Box, Pagination, Typography
} from '@mui/material';
import useGithubListing from 'hooks/use-github-listing';
import ListingFilters from 'shared/filters';
import GoBack from 'shared/go-back';
import IssueListItem from 'shared/issue/list';

const IssueListView = () => {
  const {
    list = [],
    loading = false,
    error,
    pagination,
    setPage,
    setQueryData,
  } = useGithubListing({
    type: 'issues',
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
        Issues <GoBack />
      </Typography>
      <ListingFilters list={list} setQueryData={setQueryData} loading={loading} />
      <IssueListItem issues={list} loading={loading} error={error} />
      <Pagination
        sx={{marginTop: 2,
          display: 'flex',
          justifyContent: 'center',}}
        count={pagination.totalPages}
        page={pagination.page}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default IssueListView;
