import GithubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';

const ElevationScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

function LayoutHeader(props) {
  return (
    <ElevationScroll {...props}>
      <AppBar position="static" sx={{ padding: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                borderRadius: 0,
                boxShadow: 'none',
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="https://github.com/facebook/react"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <GithubIcon sx={{ mr: 1 }} /> facebook / react
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                borderRadius: 0,
                boxShadow: 'none',
              }}
            >
              <GithubIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <GithubIcon
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                />{' '}
                facebook / react
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Github Profile">
                <IconButton
                  sx={{ p: 0 }}
                  href="http://github.com/VimLeSai"
                  target={'_blank'}
                >
                  <Avatar
                    alt="VimLeSai"
                    src="https://avatars.githubusercontent.com/VimLeSai"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
export default LayoutHeader;
