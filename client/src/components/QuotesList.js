import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { QuotesContext, QuoteDispatchContext } from '../context/QuotesContext';
import useInputState from '../hooks/useInputState';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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

  const [value, handleChange, reset] = useInputState({
    topic: '',
    author: '',
    translatedAuthor: '',
    origin: '',
    translatedOrigin: '',
    quote: '',
    translatedQuote: '',
  });

  useEffect(() => {
    const fetchQuotes = async () => {
      quoteDispatch({
        type: 'FETCH_QUOTES',
        payload: await axios.get('api/admin/quotes'),
      });
    };
    fetchQuotes();
  }, []);

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('api/admin/quote', value);
      quoteDispatch({
        type: 'POST_QUOTE',
        response,
      });
      reset();
    } catch (error) {
      quoteDispatch({
        type: 'ERROR',
        error: error.response,
      });
    }
  };

  const handleClose = () => {
    quoteDispatch({
      type: 'CLOSE',
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
        <Alert severity="success">Quote saved successful</Alert>
      </Snackbar>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Grid container spacing={2}>
          {quotes.quotes.map((quote) => (
            <Grid item key={quote._id} xs={12}>
              <Card className={classes.root}>
                <CardHeader
                  title={quote.topic.toUpperCase()}
                  subheader="September 14, 2016"
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
                  <IconButton aria-label="add to favorites">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
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
