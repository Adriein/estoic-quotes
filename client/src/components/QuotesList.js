import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';

import { QuotesContext, QuoteDispatchContext } from '../context/QuotesContext';
import useInputState from '../hooks/useInputState';

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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

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
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function QuotesList() {
  const classes = useStyles();
  const quoteDispatch = useContext(QuoteDispatchContext);
  const quotes = useContext(QuotesContext);
  const [value, handleChange] = useInputState({ lang: 'en' });

  useEffect(() => {
    const fetchQuotes = async () => {
      quoteDispatch({
        type: 'FETCH_QUOTES',
        payload: await axios.get(`api/admin/quotes`),
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

  const changeLang = (e) => {
    handleChange(e);
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
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Language
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value.lang}
            onChange={changeLang}
            label="Language"
            name="lang"
          >
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'es'}>Spanish</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          {quotes.quotes.map((quote) =>
            value.lang === 'en' ? (
              <Grid item key={quote._id} xs={12}>
                <Card className={classes.root}>
                  <CardHeader
                    title={quote.topic.toUpperCase()}
                    subheader={moment(quote.creationDate).calendar()}
                    action={
                      quote.translations ? (
                        <Chip
                          icon={<DoneIcon />}
                          label="Completed"
                          color="default"
                        />
                      ) : null
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
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
            ) : (
              quote.translations && (
                <Grid item key={quote._id} xs={12}>
                  <Card className={classes.root}>
                    <CardHeader
                      title={quote.topic.toUpperCase()}
                      subheader={moment(quote.creationDate).calendar()}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                      >
                        {
                          quote.translations.find(
                            (translation) => translation.type === 'quote'
                          ).spanish
                        }
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        -
                        {
                          quote.translations.find(
                            (translation) => translation.type === 'author'
                          ).spanish
                        }
                        ,{' '}
                        {
                          quote.translations.find(
                            (translation) => translation.type === 'origin'
                          ).spanish
                        }
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
              )
            )
          )}
        </Grid>
      </Container>
    </>
  );
}
