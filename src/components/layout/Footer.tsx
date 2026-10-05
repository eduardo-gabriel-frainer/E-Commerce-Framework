"use client";

import { usePathname } from "next/navigation";
import { useStorefrontSettings } from "@/components/storefront/StorefrontProvider";

export default function Footer() {
    const pathname = usePathname();
    const settings = useStorefrontSettings();

    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;

    const currentYear = new Date().getFullYear();
    const copyright = settings.copyright.replaceAll("{year}", String(currentYear));
    const location = [settings.address, settings.city, settings.state].filter(Boolean).join(", ");
    const socialLinks = [
        { label: "Instagram", href: toSocialUrl(settings.instagram, "instagram") },
        { label: "Facebook", href: toSocialUrl(settings.facebook, "facebook") },
        { label: "WhatsApp", href: settings.whatsappLink },
    ].filter((link) => link.href);

    return (
        <footer id="contato" className="px-6 py-12 text-sm text-white/80" style={{ backgroundColor: settings.primaryColor }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 md:grid-cols-4">
                    <div className="space-y-4 md:col-span-2">
                        <div className="flex items-center gap-2">
                            {settings.logo ? (
                                <img src={settings.logo} alt="" className="max-h-10 max-w-32 object-contain" />
                            ) : (
                                <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white" style={{ backgroundColor: settings.accentColor }}>▲</span>
                            )}
                            <span className="text-xl font-bold text-white">{settings.storeName}</span>
                        </div>
                        <p className="max-w-sm text-xs leading-relaxed text-white/70">{settings.footerMessage}</p>
                    </div>

                    <div className="md:justify-self-end">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: settings.accentColor }}>Navegação</h3>
                        <ul className="space-y-2 text-xs">
                            <li><a href="#inicio" className="transition-colors hover:text-white">Início</a></li>
                            <li><a href="#produtos" className="transition-colors hover:text-white">Produtos</a></li>
                            <li><a href="#sobre" className="transition-colors hover:text-white">Sobre</a></li>
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:justify-self-end">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: settings.accentColor }}>Contato</h3>
                        <ul className="space-y-2 text-xs text-white/70">
                            {settings.email && <li><a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a></li>}
                            {settings.phone && <li><a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a></li>}
                            {settings.whatsapp && <li>{settings.whatsapp}</li>}
                            {location && <li>{location}</li>}
                        </ul>
                    </div>
                </div>

                {settings.otherLinks.trim() && (
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 border-b border-white/10 py-5 text-xs">
                        {settings.otherLinks.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((link) => {
                            const href = toSafeExternalUrl(link);
                            return href ? <li key={link}><a href={href} target="_blank" rel="noreferrer" className="hover:text-white">{link}</a></li> : null;
                        })}
                    </ul>
                )}

                <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-white/50 sm:flex-row">
                    <p>{copyright}</p>
                </div>
            </div>
        </footer>
    );
}

function toSocialUrl(value: string, network: "instagram" | "facebook") {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;

    const username = trimmed.replace(/^@/, "");
    return network === "instagram"
        ? `https://www.instagram.com/${username}`
        : `https://www.facebook.com/${username}`;
}

function toSafeExternalUrl(value: string) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch {
        return "";
    }
}
