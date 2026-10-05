export type AdminSection = "identity" | "hero" | "info" | "social" | "footer";

export type StoreConfig = {
    storeName: string; logo: string | null; primaryColor: string; secondaryColor: string; accentColor: string; backgroundColor: string;
    heroTitle: string; heroDescription: string; heroImage: string | null; storeDescription: string; phone: string; email: string; whatsapp: string;
    address: string; city: string; state: string; instagram: string; facebook: string; whatsappLink: string; otherLinks: string; footerMessage: string; copyright: string;
};

export type ManagedProduct = { id: number; name: string; description: string; price: number; image: string | null };