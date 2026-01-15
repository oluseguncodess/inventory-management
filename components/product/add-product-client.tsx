"use client";

import { Banknote, BookText } from "lucide-react";
import CardProduct from "./card-product";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ErrorsList from "./errorlist";
import { Activity } from "react";
import { addProduct } from "@/lib/product-actions";
import { formSchema } from "@/lib/schema/product-schema";

type FormFields = z.infer<typeof formSchema>;
type TFormFields = z.input<typeof formSchema>;

export default function AddProductClient() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TFormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      sku: "",
    },
  });

  const errorMessages = Object.values(errors).map((error) => error.message);

  async function onSubmit(data: FormFields) {
    try {
      const result = await addProduct(data);

      if (result?.success) {
        console.log("success");
      } else {
        console.log("error:", result?.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="flex-1 p-5 flex flex-col gap-3 md:p-8 md:gap-5 overflow-y-auto max-sm:h-screen">
      <div className="flex">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold md:text-3xl">Add New Product</h1>
          <p className="text-[0.75rem] text-gray-500 md:text-sm">
            Create a new item in your inventory by filling out the form below.
          </p>
        </div>
      </div>
      <Activity mode={errorMessages.length > 0 ? "visible" : "hidden"}>
        <ErrorsList errors={errorMessages} />
      </Activity>
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<TFormFields>)}
        noValidate
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardProduct title="General Information" icon={BookText}>
            <CardContent className="px-0 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm">
                  Product Name
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <Input
                  {...register("name")}
                  type="text"
                  id="name"
                  autoComplete="name"
                  placeholder="e.g. Wireless Headphones"
                  className="py-5 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-sm">
                  Category
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <Input
                  {...register("category")}
                  placeholder="Create a new category..."
                  name="category"
                  id="category"
                  className="text-sm py-5"
                />
              </div>
            </CardContent>
          </CardProduct>
          <CardProduct title="Pricing & Inventory" icon={Banknote}>
            <CardContent className="grid max-sm:grid-cols-1 sm:grid-cols-2 gap-4 p-0">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="price" className="text-sm">
                  Unit Price
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <Input
                  {...register("price")}
                  type="number"
                  id="price"
                  autoComplete="price"
                  placeholder="$ 0.00"
                  className="py-5 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quantity" className="text-sm">
                  Quantity
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <Input
                  {...register("quantity")}
                  type="number"
                  id="quantity"
                  autoComplete="quantity"
                  placeholder="0"
                  className="py-5 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sku" className="text-sm">
                  Sku
                </label>
                <Input
                  {...register("sku")}
                  type="text"
                  id="sku"
                  autoComplete="sku"
                  placeholder="e.g. WM-2023-001"
                  className="py-5 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lowStockAt" className="text-sm">
                  Low Stock Alert
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <Input
                  {...register("lowStockAt")}
                  type="number"
                  id="lowStockAt"
                  autoComplete="lowStockAt"
                  placeholder="10"
                  className="py-5 text-sm"
                />
              </div>
            </CardContent>
          </CardProduct>
          <Button
            className={`w-50 ${isSubmitting ? "animate-pulse" : ""}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
