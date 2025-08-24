import { Box, Button } from '@mui/material';

interface ShippingOptionsProps {
  changeStep: (step: number) => void;
}

const ShippingOptions = ({ changeStep }: ShippingOptionsProps) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Button type='button' variant='contained' fullWidth sx={{ paddingY: 1.5 }} onClick={() => changeStep(0)}>
        Back to Address
      </Button>
    </Box>
  );
};

export default ShippingOptions;
