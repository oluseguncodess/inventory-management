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
    console.log('Validated data:', validateData);
    
    return { 
      success: true, 
      message: 'Data passed successfully',
      data: validateData 
    };
  } catch (error) {
    console.error('Server error:', error);
    
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