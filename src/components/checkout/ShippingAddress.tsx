import {
  Box,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store/hooks";
import { updateShippingAddressForCartThunk } from "../../store/thunk/cart";
import type { ShippingAddress as ShippingAddressType } from "../../types/cart/cart-response.model";

// Schema with validation
const schema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z.string().nonempty("Last name is required"),
  addressLine1: z
    .string()
    .nonempty("Address is required")
    .min(10, "Address must be at least 10 characters"),
  addressLine2: z.string().optional(),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  zipCode: z.string().nonempty("zipCode is required"),
  saveForFuture: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface ShippingAddressProps {
  cartId: string;
  changeStep: (step: number) => void;
  shippingAddress?: ShippingAddressType;
}

const ShippingAddress = ({
  cartId,
  changeStep,
  shippingAddress,
}: ShippingAddressProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur", // validate on blur (when leaving input)
    defaultValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
      saveForFuture: false,
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(
        updateShippingAddressForCartThunk({ cartId, ...data })
      ).unwrap();
      changeStep(1);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("ShippingAddress:", shippingAddress);
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Shipping Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5}>
          {/* First & Last Name */}
          <Stack direction="row" spacing={1}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  sx={{ flex: 1 }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  sx={{ flex: 1 }}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Stack>

          {/* Address */}
          <Controller
            name="addressLine1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                variant="outlined"
                error={!!errors.addressLine1}
                helperText={errors.addressLine1?.message}
              />
            )}
          />
          <Controller
            name="addressLine2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Apartment, suite, etc(optional)"
                variant="outlined"
              />
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />

          {/* Country, State, zipCode */}
          <Stack direction="row" spacing={1}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ flex: 1 }} error={!!errors.country}>
                  <InputLabel id="country">Country</InputLabel>
                  <Select {...field} labelId="country" label="Country">
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                  </Select>
                  {errors.country && (
                    <Typography variant="caption" color="error">
                      {errors.country.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ flex: 1 }} error={!!errors.state}>
                  <InputLabel id="state">State</InputLabel>
                  <Select {...field} labelId="state" label="State">
                    <MenuItem value="West Bengal">West Bengal</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                  </Select>
                  {errors.state && (
                    <Typography variant="caption" color="error">
                      {errors.state.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="zipCode"
                  variant="outlined"
                  sx={{ flex: 1 }}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                />
              )}
            />
          </Stack>

          {/* Save Info */}
          <Controller
            name="saveForFuture"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Save contact information"
                />
              </FormGroup>
            )}
          />

          {/* Submit Button (always enabled) */}
          <Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ paddingY: 1.5 }}
              disabled={isSubmitting}
            >
              Continue to shipping
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ShippingAddress;
