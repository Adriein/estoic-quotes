import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Grid from '@material-ui/core/Grid';


import { AuthContext, DispatchContext } from '../context/AuthContext';
import { QuoteDispatchContext } from '../context/QuotesContext';
import useInputState from '../hooks/useInputState';
import axios from 'axios';
import QuotesForm from './QuotesForm';

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
  },
  save: {
    paddingTop: theme.spacing(3),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export function Dashboard() {
  const { auth } = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);
  const quoteDispatch = useContext(QuoteDispatchContext)
  const classes = useStyles();

  const [value, handleChange, reset] = useInputState({
    topic: '',
    translatedTopic: '',
    quote: '',
    translatedQuote: '',
  });

  const handleLogout = async (e) => {
    try {
      const response = await axios.post('api/auth/signout');
      dispatch({
        type: 'LOGOUT',
        response,
      });
    } catch (error) {
      dispatch({
        type: 'LOGOUT_ERROR',
        error: error.response.data.errors,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('api/admin/quote', value);
      quoteDispatch({
        type: 'POST_QUOTE',
        response,
      });
      reset();
    } catch (error) {
      console.log(error.response)
      quoteDispatch({
        type: 'ERROR',
        error:error.response,
      });
    }
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
            Welcome: {auth.username}
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <QuotesForm value={value} handleChange={handleChange} lang={'en'}/>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <QuotesForm value={value} handleChange={handleChange} lang={'es'}/>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.save}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SaveAltIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
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

export default Dashboard;
