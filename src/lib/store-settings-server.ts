import { createClient } from "@/lib/supabase/server";
import { normalizeStoreConfig } from "@/lib/store-config";

export async function getPublicStoreSettings() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("store_settings")
        .select("settings")
        .eq("id", "default")
        .maybeSingle();

    if (error) throw error;

    return normalizeStoreConfig(data?.settings);
}
