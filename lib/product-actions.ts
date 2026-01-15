'use server'

import { randomUUID } from 'node:crypto';
import { prisma } from "@/prisma";
import { getCurrentUser } from "./actions/auth-requests";
import { revalidatePath } from "next/cache";
import { formSchema } from '@/lib/schema/product-schema';
import z from 'zod';

type ProductFormData = z.infer<typeof formSchema>

export async function deleteProduct(productId: string) {
  const { id: userId } = await getCurrentUser();
  try {
    await prisma.product.delete({
      where: {
        id: productId,
        userId
      },
    });

    revalidatePath('/inventory');
    return { success: true };
  } catch (error) {
    return { success: false, error: error || 'Failed to delete product' };
  }
}

export async function addProduct(product: ProductFormData) {
  const { id: userId } = await getCurrentUser();

  try {
    const validateData = formSchema.parse(product);

    const createProduct =
    {
      id: randomUUID(),
      userId,
      name: validateData.name.toUpperCase(),
      category: validateData.category.toUpperCase(),
      sku: validateData.sku || null,
      price: validateData.price,
      quantity: validateData.quantity,
      lowStockAt: validateData.lowStockAt,
      updatedAt: new Date()
    }
    await prisma.product.create({ data: createProduct })

    revalidatePath('/inventory')

    return { 
      success: true, 
      message: "Product added successfully" 
    };
    
  }
  catch (error) {

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.message || 'Validation failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}