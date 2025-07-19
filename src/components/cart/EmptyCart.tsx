import { Box, Typography } from "@mui/material";

const EmptyCart = ({ message }: { message: string }) => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h5" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyCart;
