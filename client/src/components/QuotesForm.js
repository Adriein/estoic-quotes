import React, { useContext } from 'react';
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

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Form({ value, handleChange, lang }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
        {lang === 'en' ? 'Original Quote' : 'Traducción de la cita'}
      </Typography>
      {lang === 'en' && (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Topic</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value.topic}
            onChange={handleChange}
            label="Topic"
            name="topic"
          >
            <MenuItem value={'clarity'}>Clarity</MenuItem>
            <MenuItem value={'passions and emotions'}>
              Passions and emotions
            </MenuItem>
            <MenuItem value={'awarness'}>Awarness</MenuItem>
            <MenuItem value={'unbiased thought'}>Unbiased thought</MenuItem>
            <MenuItem value={'right action'}>Right action</MenuItem>
            <MenuItem value={'problem solving'}>Problem solving</MenuItem>
            <MenuItem value={'duty'}>Duty</MenuItem>
            <MenuItem value={'pragmatism'}>Pragmatism</MenuItem>
            <MenuItem value={'fortitude and resilence'}>
              Fortitude and resilence
            </MenuItem>
            <MenuItem value={'virtue and kindness'}>
              Virtue and kindness
            </MenuItem>
            <MenuItem value={'acceptance'}>Acceptance</MenuItem>
            <MenuItem value={'meditation on mortality'}>
              Meditation on mortality
            </MenuItem>
          </Select>
        </FormControl>
      )}
      <TextField
        className={classes.formControl}
        label={lang === 'en' ? 'Author' : 'Autor'}
        variant="outlined"
        value={lang === 'en' ? value.author : value.translatedAuthor}
        onChange={handleChange}
        name={lang === 'en' ? 'author' : 'translatedAuthor'}
      />
      <TextField
        className={classes.formControl}
        label={lang === 'en' ? 'Origin' : 'Origen'}
        variant="outlined"
        value={lang === 'en' ? value.origin : value.translatedOrigin}
        onChange={handleChange}
        name={lang === 'en' ? 'origin' : 'translatedOrigin'}
      />
      <TextField
        id="outlined-multiline-static"
        label={lang === 'en' ? 'Quote' : 'Cita Traducida'}
        multiline
        rows={6}
        placeholder={
          lang === 'en'
            ? 'Type the quote here...'
            : 'Escribe aqui la traducción de la cita...'
        }
        value={lang === 'en' ? value.quote : value.translatedQuote}
        variant="outlined"
        name={lang === 'en' ? 'quote' : 'translatedQuote'}
        onChange={handleChange}
        fullWidth
      />
    </>
  );
}

function QuotesForm() {
  const classes = useStyles();
  const quoteDispatch = useContext(QuoteDispatchContext);
  const quotes = useContext(QuotesContext);
  console.log(quotes.inputs)
  const [value, handleChange, reset] = useInputState(quotes.inputs);

  const handleSubmit = async (e) => {
    try {
      if (quotes.selected && quotes.selected !== '') {
        quoteDispatch({
          type: 'UPDATE_QUOTE',
          payload: await axios.put(`api/admin/quote/${quotes.selected}`, value),
        });
      } else {
        quoteDispatch({
          type: 'POST_QUOTE',
          payload: await axios.post('api/admin/quote', value),
        });
      }
      reset();
    } catch (error) {
      quoteDispatch({
        type: 'ERROR',
        selected: quotes.selected,
        payload: error.response,
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
        <Alert severity={quotes.errormsg !== '' ? 'error' : 'success'}>
          {quotes.errormsg !== '' ? quotes.errormsg : 'Quote saved successful'}
        </Alert>
      </Snackbar>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Form value={value} handleChange={handleChange} lang={'en'} />
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Form value={value} handleChange={handleChange} lang={'es'} />
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
    </>
  );
}

export default QuotesForm;
