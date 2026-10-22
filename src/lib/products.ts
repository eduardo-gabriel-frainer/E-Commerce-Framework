import { createClient } from "@/lib/supabase/client";
import type { ManagedProduct } from "@/types/admin";

export type ManagedProductInput = Omit<ManagedProduct, "id">;

export async function loadProducts(): Promise<ManagedProduct[]> {
  const { data, error } = await createClient()
    .from("products")
    .select("*");

  if (error) throw error;
  return data ?? [];
}

export async function createProduct(
  product: ManagedProductInput,
): Promise<ManagedProduct> {
  const { data, error } = await createClient()
    .from("products")
    .insert(product)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(
  id: ManagedProduct["id"],
  product: ManagedProductInput,
): Promise<ManagedProduct> {
  const { data, error } = await createClient()
    .from("products")
    .update(product)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: ManagedProduct["id"]): Promise<void> {
  const { error } = await createClient().from("products").delete().eq("id", id);

  if (error) throw error;
}
