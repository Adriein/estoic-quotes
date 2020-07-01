import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QuotesContext, QuoteDispatchContext } from '../context/QuotesContext';
import { AuthContext, DispatchContext } from '../context/AuthContext';
import QuotesList from './QuotesList';
import QuotesForm from './QuotesForm';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

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
    padding: theme.spacing(8, 0, 6),
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

export function Dashboard() {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);
  const quoteDispatch = useContext(QuoteDispatchContext);
  const quotes = useContext(QuotesContext);

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

  const toggleView = (e) => {
    quoteDispatch({
      type: e.target.name,
    });
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
          <Link
            variant="button"
            color="textPrimary"
            className={classes.link}
            name="TOGGLE_VIEW"
            onClick={toggleView}
          >
            Quotes
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            name="TOGGLE_CREATE"
            className={classes.link}
            onClick={toggleView}
          >
            Create Quotes
          </Link>
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
      {quotes.form ? <QuotesForm /> : <QuotesList />}
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
