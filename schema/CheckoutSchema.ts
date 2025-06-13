import { z } from "zod";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  shippingMethod: z.enum(["standard", "express"], {
    required_error: "Please select a shipping method",
  }),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .transform((val) => val.replace(/\s/g, "")), // Remove spaces for validation
  cardName: z.string().min(1, "Cardholder name is required"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry (MM/YY)"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3-4 digits"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default checkoutSchema;
