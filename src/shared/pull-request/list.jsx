import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { routes } from 'routes/paths';
import { formatDate } from 'utils/helpers';

const PullRequestList = ({ pullRequests = [], loading = false, error }) => {
  if (error) {
    return (
      <Box>
        <Typography variant="h5">Something went wrong!</Typography>;
        <Typography variant="body1" color="error" gutterBottom>
          {`Error: ${error.message}`}
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Typography>
    );
  }

  if (!pullRequests.length && !loading) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 2 }}>
        No pull requests found
      </Typography>
    );
  }

  return (
    <List>
      {pullRequests.map(({ number, user = {}, created_at, title }, index) => (
        <ListItem
          component="a"
          href={routes.pullRequestDetail.replace(':id', number)}
          key={number}
          sx={{
            color: 'inherit',
            borderBottom: index + 1 !== pullRequests.length && '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          <ListItemText
            primary={`#${number} - ${title}`}
            secondary={`${user.login} - ${formatDate(created_at)}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PullRequestList;
