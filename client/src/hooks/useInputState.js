import { useState } from 'react';
export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (event) => {
    setValue(
      Object.assign({}, value, { [event.target.name]: event.target.value })
    );
  };
  const reset = () => {
    setValue(initialVal);
  };
  return [value, handleChange, reset];
};
