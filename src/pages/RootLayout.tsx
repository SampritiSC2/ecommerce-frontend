import { Container } from "@mui/material";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
