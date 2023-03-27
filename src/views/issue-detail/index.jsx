import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import { formatDate } from 'utils/helpers';
import CommentsSection from 'shared/comments/section';
import GoBack from 'shared/go-back';

const IssueContainer = styled(Box)({
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

const IssueDetail = () => {
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getIssue = async () => {
      setLoading(true);
      try {
        // Make API call to Github Issue API
        const response = await axios.get(
          'https://api.github.com/repos/facebook/react/issues/19302'
        );
        setIssue(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getIssue();
  }, []);

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Typography>
    );
  }

  return (
    <Paper elevation={0}>
      <GoBack />
      <IssueContainer>
        <Typography variant="h4">
          #{issue.number} {issue.title}
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', gap: 2, justifyContent: 'start' }}>
          <ListItemText
            primary="Author:"
            secondary={issue.user?.login}
            sx={{
              display: 'inline-flex',
              flex: 'none',
              alignItems: 'center',
              gap: 1,
            }}
          />
          <Divider orientation="vertical" flexItem variant="middle" />{' '}
          <ListItemText
            primary="Status:"
            secondary={issue.state}
            sx={{
              display: 'inline-flex',
              flex: 'none',
              alignItems: 'center',
              gap: 1,
            }}
          />
          <Divider orientation="vertical" flexItem variant="middle" />
          <ListItemText
            primary="Date:"
            secondary={formatDate(issue.created_at)}
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
            __html: issue.body,
          }}
        ></Body>
        <Divider variant="middle" sx={{ my: 5 }} />
        <CommentsSection url={issue.comments_url} />
      </IssueContainer>
    </Paper>
  );
};

export default IssueDetail;
