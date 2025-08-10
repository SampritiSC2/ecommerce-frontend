import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../store/thunk/auth";
import { useAppDispatch } from "../store/hooks";
import { getCurrentUserCartThunk } from "../store/thunk/cart";
import { CARTID_KEY } from "../constants/cart.constants";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password should have at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async ({ email, password }: FormData) => {
    try {
      const res = await dispatch(loginThunk({ email, password })).unwrap();
      await dispatch(getCurrentUserCartThunk()).unwrap();
      localStorage.removeItem(CARTID_KEY);
      toast.success("Login successful!");
      navigate("/"); // Redirect after login
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Login failed");
    }
  };

  const onSubmit = (data: FormData) => {
    handleLogin(data);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
