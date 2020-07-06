import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useInputState from '../hooks/useInputState';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Slide from '@material-ui/core/Slide';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href=" https://stoic-quo.herokuapp.com/">
        Stoic Quotes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    cursor: 'pointer',
  },
  heroContent: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(8, 0, 6),
    background: 'linear-gradient(45deg, #00b09b 30%, #96c93d 90%)',
  },
  content: {
    padding: theme.spacing(8, 0, 6),
  },
  emailContent: {
    padding: theme.spacing(8, 0, 6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  quoteContainer: {
    padding: theme.spacing(4, 4, 4, 4),
  },
  quoteOrigin: {
    marginTop: theme.spacing(1),
  },
  input: {
    width: '500px',
  },
  subscribe: {
    marginTop: theme.spacing(3),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export function Landing(props) {
  const classes = useStyles();
  const [submited, setSubmited] = useState(false);
  const [value, handleChange, reset] = useInputState({ lang: 'en', email: '' });

  const handleLogin = (props) => (event) => {
    props.history.push('/login');
  };

  const handleSubmit = async (props) => {
    await axios.post(`api/subscribe`, value);
    setSubmited(true);
    reset();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Stoic Quotes
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={handleLogin(props)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        component="main"
        className={classes.emailContent}
      >
        <Grid
          container
          wrap="wrap"
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.heroContent}
        >
          <Typography variant="h4" color="inherit" noWrap>
            Welcome to Stoic Quotes
          </Typography>
          <Typography variant="subtitle1" color="inherit" noWrap>
            To start your stoic journey and recive a weekly email just enter
            your email below
          </Typography>
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        component="main"
        className={classes.emailContent}
      >
        {submited ? (
          <Slide direction="left" in={submited} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={classes.quoteContainer}>
              <Typography variant="h6" color="inherit" noWrap>
                To recibe weekly quotes please verify your email
              </Typography>
            </Paper>
          </Slide>
        ) : (
          <>
            <FormControl variant="outlined" className={classes.input}>
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <OutlinedInput
                id="email-input"
                value={value.email}
                onChange={handleChange}
                name="email"
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="email">
                      <MailOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={40}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.subscribe}
              onClick={handleSubmit}
            >
              Subscribe
            </Button>
          </>
        )}
      </Container>
      <Container maxWidth="md" component="main" className={classes.content}>
        <Paper elevation={3} className={classes.quoteContainer}>
          <Typography variant="h6" color="inherit" noWrap>
            “The happiness of your life depends upon the quality of your
            thoughts.”
          </Typography>
          <Typography
            variant="subtitle2"
            color="inherit"
            noWrap
            className={classes.quoteOrigin}
          >
            ― Marcus Aurelius, Meditations
          </Typography>
        </Paper>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Landing;
