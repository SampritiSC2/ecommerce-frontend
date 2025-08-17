import { Box, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";

const steps = ["Address", "Shipping", "Payment"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <h1>Checkout</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {/* Left Side */}
          <Grid size={{ xs: 12, md: 5 }}>
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
          </Grid>
          {/* Right Side */}
          <Grid size={{ xs: 12, md: 5 }} offset={{ md: 2 }}>
            <h1>Hello World</h1>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckoutPage;
