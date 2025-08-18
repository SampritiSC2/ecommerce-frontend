import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const steps = ['Address', 'Shipping', 'Payment'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box
      sx={(theme) => ({
        marginTop: theme.spacing(5),
      })}>
      <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
        Checkout
      </Typography>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={4}>
          {/* Left Side */}
          <Grid size={{ xs: 12, md: 5 }}>
            {/* Stepper */}
            <Box>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
            {/* Shipping Information Form */}
            <Box
              sx={(theme) => ({
                marginTop: theme.spacing(2),
              })}>
              <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Shipping Details
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction='row' spacing={1}>
                  <TextField id='first-name' label='First Name' variant='outlined' sx={{ flex: 1 }} />
                  <TextField id='last-name' label='Last Name' variant='outlined' sx={{ flex: 1 }} />
                </Stack>
                <TextField id='address-line-1' label='Address' variant='outlined' />
                <TextField id='address-line-2' label='Apartment, suite, etc(optional)' variant='outlined' />
                <TextField id='city' label='City' variant='outlined' />
                <Stack direction='row' spacing={1}>
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel id='country'>Country</InputLabel>
                    <Select labelId='country' id='country' value='' label='Country' onChange={() => {}}>
                      <MenuItem value='India'>India</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Canada'>Canada</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel id='state'>State</InputLabel>
                    <Select labelId='state' id='state' value='' label='State' onChange={() => {}}>
                      <MenuItem value='West Bengal'>West Bengal</MenuItem>
                      <MenuItem value='Chennai'>Chennai</MenuItem>
                      <MenuItem value='Mumbai'>Mumbai</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField id='zip-code' label='Zipcode' variant='outlined' sx={{ flex: 1 }} />
                </Stack>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label='Save contact information' />
                </FormGroup>
                <Box>
                  <Button variant='contained' fullWidth sx={{ paddingY: 1.5 }}>
                    Continue to shipping
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
          {/* Right Side */}
          <Grid size={{ xs: 12, md: 5 }} offset={{ md: 2 }}>
            <h1>Hello World</h1>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
