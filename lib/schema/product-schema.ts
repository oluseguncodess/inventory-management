import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category name is too long")
    .trim()
    .transform((val) => val.toLowerCase()),
  sku: z
    .string()
    .max(50, "SKU must be less than 50 characters")
    .trim()
    .optional(),
  price: z.preprocess(
    (val) =>
      val === "" || val === undefined || Number.isNaN(val)
        ? undefined
        : Number(val),
    z
      .number({ error: "Price is required" })
      .nonnegative("Price must be 0 or greater")
  ),
  quantity: z.preprocess(
    (val) =>
      val === "" || val === undefined || Number.isNaN(val)
        ? undefined
        : Number(val),
    z
      .number({ error: "Quantity is required" })
      .int()
      .nonnegative("Quantity must be 0 or greater")
  ),
  lowStockAt: z.preprocess(
    (val) =>
      val === "" || val === undefined || Number.isNaN(val)
        ? undefined
        : Number(val),
    z
      .number({ error: "Low Stock is required" })
      .int()
      .nonnegative("Low stock threshold must be 0 or greater")
  ),
});

export type FormFields = z.infer<typeof formSchema>;