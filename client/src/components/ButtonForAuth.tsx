import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import './style.css'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[900]),
  backgroundColor: blueGrey[900],
  '&:hover': {
    backgroundColor: grey[900],
  },
  width: 150
}));


const ButtonForAuth: React.FC= () => {
  return (
    <Stack spacing={2} direction="row" className='button_reg'>
      <Link to='/login'>
      <ColorButton variant="contained">ВОЙТИ</ColorButton>
      </Link>
    </Stack>
  );
};

export default ButtonForAuth;