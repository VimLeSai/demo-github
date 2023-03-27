import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsSection from 'shared/comments/section';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import { formatDate } from 'utils/helpers';
import { routes } from 'routes/paths';
import GoBack from 'shared/go-back';

const useStyles = makeStyles(() => ({
  root: {
    margin: 2,
    padding: 2,
  },
  header: {
    marginBottom: 2,
  },
  divider: {
    margin: 2,
  },
}));

const PullRequestContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
});

const Body = styled(Typography)({
  fontSize: '16px',
  marginBottom: '16px',
});

const PullRequestDetailView = () => {
  const classes = useStyles();
  const params = useParams();
  const [pullRequest, setPullRequest] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prID = params.id;
    const getPullReq = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/facebook/react/pulls/${prID}`
        );
        setPullRequest(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPullReq();
  }, [params.id]);

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Typography>
    );
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <GoBack />
      <PullRequestContainer>
        <Typography variant="h4" className={classes.header}>
          #{pullRequest.number} {pullRequest.title}
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', gap: 2, justifyContent: 'start' }}>
          <ListItemText
            primary="Author"
            secondary="John Doe"
            sx={{
              display: 'inline-flex',
              flex: 'none',
              alignItems: 'center',
              gap: 1,
            }}
          />
          <Divider orientation="vertical" flexItem variant="middle" />
          <ListItemText
            primary="Date"
            secondary={formatDate(pullRequest.created_at)}
            sx={{
              display: 'inline-flex',
              flex: 'none',
              alignItems: 'center',
              gap: 1,
            }}
          />
        </Box>
        <Body
          dangerouslySetInnerHTML={{
            __html: pullRequest.body,
          }}
        ></Body>
        <Divider variant="middle" sx={{ my: 5 }} />
        <CommentsSection url={pullRequest.comments_url} />
      </PullRequestContainer>
    </Paper>
  );
};

export default PullRequestDetailView;
