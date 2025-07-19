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
import { useEffect } from "react";
import { toast } from "react-toastify";
import { register as registerUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

// Zod validation schema with your rules
const schema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username should be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password should have at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const handleRegister = async ({ username, email, password }: FormData) => {
    const response = await registerUser(username, email, password);

    if (response?.message) {
      toast.success(response.message);
      navigate("/login");
      return;
    }

    if (response?.error) {
      toast.error(response.error);
    }
  };

  const onSubmit = (data: FormData) => {
    handleRegister(data);
  };

  const password = watch("password"); // ← watching password here

  useEffect(() => {
    // Revalidate confirmPassword only if the user has interacted with it
    if (touchedFields.confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, touchedFields.confirmPassword, trigger]);

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Username"
            fullWidth
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

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

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignupForm;
