import { Box, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import ShippingOptions from "../components/checkout/ShippingOptions";
import ShippingAddress from "../components/checkout/ShippingAddress";

const steps = ["Address", "Shipping", "Payment"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector((state) => state.cart.cart);

  const changeStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={(theme) => ({
        marginTop: theme.spacing(5),
      })}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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
              />
            )}
            {/* Shipping options */}
            {activeStep === 1 && <ShippingOptions />}
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
