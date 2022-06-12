import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IInput } from '../models/IInput';

const Input: React.FC<IInput> = (props) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id={props.id} label={props.label} variant={props.variant} type={props.type} />
    </Box>
  );
}

export default Input;