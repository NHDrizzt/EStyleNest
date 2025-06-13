import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "@/components/Checkout/checkoutSchema";

declare module "react-hook-form" {
  function useFormContext<T = CheckoutFormData>(): UseFormReturn<T>;
}
