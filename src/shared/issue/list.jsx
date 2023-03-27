import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { routes } from 'routes/paths';
import { formatDate } from 'utils/helpers';

const IssueList = ({ issues = [], loading = false, error }) => {
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

  if (!issues.length && !loading) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 2 }}>
        Yeah ! No issues found
      </Typography>
    );
  }

  return (
    <List>
      {issues.map(({ title, number, user = {}, created_at }, index) => (
        <ListItem
          component="a"
          href={routes.issueDetail.replace(':id', number)}
          key={number}
          sx={{
            color: 'inherit',
            borderBottom: index + 1 !== issues.length && '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          <ListItemText
            primary={title}
            secondary={`#${number} opened by ${user.login} on ${formatDate(
              created_at
            )}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default IssueList;
