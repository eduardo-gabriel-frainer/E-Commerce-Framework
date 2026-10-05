import { createClient } from "@/lib/supabase/client";
import type { StoreConfig } from "@/types/admin";
import { normalizeStoreConfig } from "@/lib/store-config";

export { defaultStoreConfig } from "@/lib/store-config";

const SETTINGS_ID = "default";

export async function loadStoreSettings(): Promise<StoreConfig> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("store_settings")
        .select("settings")
        .eq("id", SETTINGS_ID)
        .maybeSingle();

    if (error) throw error;

    return normalizeStoreConfig(data?.settings);
}

export async function saveStoreSettings(settings: StoreConfig): Promise<void> {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) throw authError;
    if (!user) throw new Error("Entre na sua conta para salvar as configurações.");

    const { error } = await supabase
        .from("store_settings")
        .upsert(
            {
                id: SETTINGS_ID,
                settings,
                updated_by: user.id,
                updated_at: new Date().toISOString(),
            },
            { onConflict: "id" },
        );

    if (error) throw error;
}
