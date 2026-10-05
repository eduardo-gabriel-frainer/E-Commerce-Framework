"use client";

import { useStorefrontSettings } from "@/components/storefront/StorefrontProvider";

const fallbackHeroImage = "https://blog.sociedadedacarne.com.br/wp-content/uploads/2019/02/shutterstock_483310876.jpg";

export default function ProductPresentation() {
    const settings = useStorefrontSettings();
    const image = settings.heroImage || fallbackHeroImage;

    return (
        <>
            <section id="inicio" className="px-6 py-10 md:py-40 sm:px-10 lg:px-16" style={{ backgroundColor: settings.primaryColor }}>
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
                    <div className="max-w-xl" style={{ color: "var(--primary-foreground)" }}>
                        <p className="font-bold" style={{ color: settings.accentColor }}>ARTESANATO EM MADEIRA</p>
                        <h1 className="mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl">{settings.heroTitle}</h1>
                        <p className="mt-5 text-base leading-relaxed opacity-80 sm:text-lg">{settings.heroDescription}</p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <a href="#produtos" className="flex flex-1 items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-bold text-accent-foreground">
                                Comprar agora
                            </a>
                            <a href="#produtos" className="flex flex-1 items-center justify-center rounded-sm border border-current bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
                                Ver coleção
                            </a>
                        </div>
                    </div>

                    <div className="relative w-full max-w-md lg:max-w-lg">
                        <img className="max-h-[32rem] w-full rounded-2xl object-cover" src={image} alt={settings.storeName} />
                    </div>
                </div>
            </section>

            <section id="sobre" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: settings.accentColor }}>Sobre a loja</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">{settings.storeName}</h2>
                <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{settings.storeDescription}</p>
            </section>
        </>
    );
}
