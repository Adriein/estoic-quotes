import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';

import { QuotesContext, QuoteDispatchContext } from '../context/QuotesContext';

import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {},
  save: {
    paddingTop: theme.spacing(3),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function QuotesList() {
  const classes = useStyles();
  const quoteDispatch = useContext(QuoteDispatchContext);
  const quotes = useContext(QuotesContext);

  useEffect(() => {
    const fetchQuotes = async () => {
      quoteDispatch({
        type: 'FETCH_QUOTES',
        payload: await axios.get('api/admin/quotes'),
      });
    };
    fetchQuotes();
  }, []);

  const handleClose = () => {
    quoteDispatch({
      type: 'CLOSE_DELETE_INFO',
    });
  };

  const handleEdit = (e) => {
    quoteDispatch({
      type: 'EDIT',
      payload: e.currentTarget.name,
    });
  };

  const handleDelete = async (e) => {
    quoteDispatch({
      type: 'DELETE',
      selected: e.currentTarget.name,
      payload: await axios.delete(`api/admin/quote/${e.currentTarget.name}`),
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={quotes.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity="success">Quote deleted successful</Alert>
      </Snackbar>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Grid container spacing={2}>
          {quotes.quotes.map((quote) => (
            <Grid item key={quote._id} xs={12}>
              <Card className={classes.root}>
                <CardHeader
                  title={quote.topic.toUpperCase()}
                  subheader={moment(quote.creationDate).calendar()}
                />
                <CardContent>
                  <Typography variant="body1" color="textPrimary" component="p">
                    {quote.quote}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    -{quote.author}, {quote.origin}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="edit"
                    onClick={handleEdit}
                    name={quote._id}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={handleDelete}
                    name={quote._id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
