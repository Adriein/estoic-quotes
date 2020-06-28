import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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

function QuotesForm({value, handleChange, lang}) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
        {lang === 'en'? 'Original Quote' : 'Traducción de la cita'}
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{lang === 'en'? 'Topic' : 'Tema'}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={lang === 'en'? value.topic : value.translatedTopic}
          onChange={handleChange}
          label={lang === 'en'? 'Topic' : 'Tema'}
          name={lang === 'en'? 'topic' : 'translatedTopic'}
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
          <MenuItem value={'virtue and kindness'}>Virtue and kindness</MenuItem>
          <MenuItem value={'acceptance'}>Acceptance</MenuItem>
          <MenuItem value={'meditation on mortality'}>
            Meditation on mortality
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{lang === 'en'? 'Author' : 'Autor'}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={lang === 'en'? value.author : value.translatedAuthor}
          onChange={handleChange}
          label={lang === 'en'? 'Author' : 'Autor'}
          name={lang === 'en'? 'author' : 'translatedAuthor'}
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
          <MenuItem value={'virtue and kindness'}>Virtue and kindness</MenuItem>
          <MenuItem value={'acceptance'}>Acceptance</MenuItem>
          <MenuItem value={'meditation on mortality'}>
            Meditation on mortality
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{lang === 'en'? 'Origin' : 'Origen'}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={lang === 'en'? value.origin : value.translatedOrigin}
          onChange={handleChange}
          label={lang === 'en'? 'Origin' : 'Origen'}
          name={lang === 'en'? 'origin' : 'translatedOrigin'}
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
          <MenuItem value={'virtue and kindness'}>Virtue and kindness</MenuItem>
          <MenuItem value={'acceptance'}>Acceptance</MenuItem>
          <MenuItem value={'meditation on mortality'}>
            Meditation on mortality
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-multiline-static"
        label={lang === 'en'? 'Translated quote' : 'Cita Traducida'}
        multiline
        rows={6}
        placeholder={lang === 'en'? 'Type the quote here...' : 'Escribe aqui la traducción de la cita...'}
        value={lang === 'en'? value.quote : value.translatedQuote}
        variant="outlined"
        name={lang === 'en'? 'quote' : 'translatedQuote'}
        onChange={handleChange}
        fullWidth
      />
    </>
  );
}

export default QuotesForm;
