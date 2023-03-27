import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { formatDate } from 'utils/helpers';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 2,
    padding: 2,
  },
  title: {
    marginBottom: 2,
  },
  divider: {
    margin: 2,
  },
  comment: {
    marginBottom: 2,
    padding: 2,
  },
  avatar: {
    marginRight: 2,
  },
  author: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'lightgray',
  },
}));

const CommentsSection = ({ url: comments_url = '' }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    if (comments_url) {
      setLoading(true);
      axios
        .get(comments_url)
        .then((comments) => {
          setComments(comments.data);
          setTotalComments(comments.data.length);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [comments_url]);

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Typography>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Comments ({totalComments})
      </Typography>
      {!comments.length && !loading && (
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          No comments found
        </Typography>
      )}
      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          <Paper elevation={0} sx={{ my: 2, p: 2 }} key={index}>
            <Grid container spacing={2} className={classes.comment}>
              <Grid item>
                <Avatar
                  alt={comment.user?.login}
                  src={comment.user.avatar_url}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1" className={classes.author}>
                  {comment.user?.login}
                </Typography>
                <Typography variant="body2" className={classes.timestamp}>
                  {formatDate(comment.createdDate)}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: comment.body,
                  }}
                ></Typography>
              </Grid>
            </Grid>
          </Paper>
          {Boolean(index !== comments.length - 1) && (
            <Divider className={classes.divider} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CommentsSection;
