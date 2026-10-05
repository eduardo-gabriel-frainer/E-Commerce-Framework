import type { StoreConfig } from "@/types/admin";

export const defaultStoreConfig: StoreConfig = {
    storeName: "Casa & Madeira",
    logo: null,
    primaryColor: "#2C1810",
    secondaryColor: "#F0EDE8",
    accentColor: "#C4622A",
    backgroundColor: "#FAF8F4",
    heroTitle: "Produtos feitos para fazer parte da sua casa.",
    heroDescription: "Peças únicas, produzidas à mão com madeiras certificadas.",
    heroImage: null,
    storeDescription: "Somos uma marca artesanal especializada em produtos de madeira de alta qualidade.",
    phone: "(11) 98765-4321",
    email: "contato@casamadeira.com.br",
    whatsapp: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    instagram: "casamadeira",
    facebook: "casamadeira",
    whatsappLink: "https://wa.me/5511987654321",
    otherLinks: "",
    footerMessage: "Produtos artesanais feitos com cuidado e dedicação, direto para a sua casa.",
    copyright: "© {year} Casa & Madeira. Todos os direitos reservados.",
};

export function normalizeStoreConfig(value: unknown): StoreConfig {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        return defaultStoreConfig;
    }

    return { ...defaultStoreConfig, ...value } as StoreConfig;
}
