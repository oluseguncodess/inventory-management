// lib/product-actions.ts
'use server'

import { prisma } from "@/prisma";
import { getCurrentUser } from "./actions/auth-requests";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  const { id: userId } = getCurrentUser();
  
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
    console.error('Failed to delete product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}