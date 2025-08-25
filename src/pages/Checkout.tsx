import { Box, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import ShippingOptions from '../components/checkout/ShippingOptions';
import ShippingAddress from '../components/checkout/ShippingAddress';
import { Navigate } from 'react-router-dom';
import { getSavedAddress } from '../services/auth.service';
import type { ShippingAddress as ShippingAddressType } from '../types/cart/cart-response.model';

const steps = ['Address', 'Shipping', 'Payment'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { loading, cart } = useAppSelector((state) => state.cart);
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddressType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getSavedAddress();
      if (response?.length) {
        setSavedAddresses(response);
      }
    })();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If getCartById/getCurrentUserCart API is succesfull but there is not cart data, navigate to home page
  if (!loading && !cart?.cartId) {
    return <Navigate to='/' replace />;
  }

  const changeStep = (step: number) => {
    setActiveStep(step);
  };

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
            {activeStep === 0 && (
              <ShippingAddress
                cartId={cart?.cartId!}
                changeStep={changeStep}
                shippingAddress={cart?.shippingAddress}
                savedAddresses={savedAddresses}
              />
            )}
            {/* Shipping options */}
            {activeStep === 1 && <ShippingOptions changeStep={changeStep} />}
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
