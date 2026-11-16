import type { StoreConfig } from "@/types/admin";

export const defaultStoreConfig: StoreConfig = {
  storeName: "Nome da sua loja",
  logo: null,
  primaryColor: "#316B70",
  secondaryColor: "#E5F2F1",
  accentColor: "#70B7AA",
  backgroundColor: "#F7FBFA",
  heroEyebrow: "Destaque da sua loja",
  heroTitle: "Coloque seu título aqui",
  heroDescription: "Adicione uma descrição para apresentar sua loja.",
  heroImage: null,
  storeDescription: "Conte aqui um pouco sobre sua loja.",
  phone: "(00) 00000-0000",
  email: "contato@exemplo.com",
  whatsapp: "(00) 00000-0000",
  address: "Seu endereço aqui",
  city: "Sua cidade",
  state: "UF",
  instagram: "seuusuario",
  facebook: "sualoja",
  whatsappLink: "https://wa.me/5500000000000",
  otherLinks: "Adicione seus links aqui",
  footerMessage: "Adicione uma mensagem para o rodapé da sua loja.",
  copyright: "© {year} Nome da sua loja. Todos os direitos reservados.",
};

export function normalizeStoreConfig(value: unknown): StoreConfig {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return defaultStoreConfig;
  }

  return { ...defaultStoreConfig, ...value } as StoreConfig;
}
