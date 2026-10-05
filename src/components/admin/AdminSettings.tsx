"use client";

import { useEffect, useState } from "react";
import { Check, LoaderCircle, RotateCcw } from "lucide-react";
import { AdminSection, StoreConfig } from "@/types/admin";
import { defaultStoreConfig, loadStoreSettings, saveStoreSettings } from "@/lib/store-settings";
import { ColorField, Field, ImageUpload, Input, Textarea } from "./AdminField";

const sections: { id: AdminSection; label: string }[] = [{ id: "identity", label: "Identidade da loja" }, { id: "hero", label: "Página inicial" }, { id: "info", label: "Informações da loja" }, { id: "social", label: "Contato e redes sociais" }, { id: "footer", label: "Rodapé" }];
const states = ["AC", "AL", "BA", "CE", "DF", "ES", "GO", "MG", "PA", "PE", "PR", "RJ", "RS", "SC", "SP"];

export default function AdminSettings({ section }: { section: AdminSection }) {
    const [config, setConfig] = useState(defaultStoreConfig);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let active = true;
        setLoading(true);
        setLoadError("");

        loadStoreSettings()
            .then((settings) => {
                if (active) setConfig(settings);
            })
            .catch((error: unknown) => {
                if (active) setLoadError(error instanceof Error ? error.message : "Não foi possível carregar as configurações.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [reloadKey]);

    const update = <K extends keyof StoreConfig>(key: K, value: StoreConfig[K]) => { setConfig((current) => ({ ...current, [key]: value })); setSaved(false); };
    const save = async () => {
        setSaving(true);
        setMessage("");
        setSaved(false);

        try {
            await saveStoreSettings(config);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2500);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Não foi possível salvar as configurações.");
        } finally {
            setSaving(false);
        }
    };

    return <div className="overflow-hidden rounded-xl border border-border bg-card"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estabelecimento</p><h2 className="mt-1 font-display text-xl font-semibold">{sections.find((item) => item.id === section)?.label}</h2></div><button type="button" disabled={loading || saving || Boolean(loadError)} onClick={save} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${saved ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-accent"}`}>{saving ? <><LoaderCircle size={16} className="animate-spin" /> Salvando...</> : saved ? <><Check size={16} /> Salvo</> : "Salvar alterações"}</button></div>{message && <p role="alert" className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-800">{message}</p>}{loading && <p role="status" className="px-6 pt-5 text-sm text-muted-foreground">Carregando configurações...</p>}{loadError && <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-200 bg-red-50 px-6 py-3"><p role="alert" className="text-sm text-red-800">{loadError}</p><button type="button" onClick={() => setReloadKey((key) => key + 1)} className="text-sm font-semibold text-red-800 underline">Tentar novamente</button></div>}<fieldset disabled={loading || saving || Boolean(loadError)} className="space-y-8 p-6">
        {section === "identity" && <><div><h3 className="font-display text-lg font-semibold">Nome e logo</h3><div className="mt-5 space-y-5"><Field label="Nome da loja" hint="Aparecerá no header e no rodapé."><Input value={config.storeName} onChange={(value) => update("storeName", value)} placeholder="Nome da loja" /></Field><ImageUpload label="Logo da loja" hint="PNG ou SVG com fundo transparente." value={config.logo} onChange={(value) => update("logo", value)} /></div></div><div className="border-t border-border pt-8"><h3 className="font-display text-lg font-semibold">Cores da loja</h3><div className="mt-5 grid gap-5 sm:grid-cols-2"><ColorField label="Cor principal" value={config.primaryColor} onChange={(value) => update("primaryColor", value)} /><ColorField label="Cor de destaque" value={config.accentColor} onChange={(value) => update("accentColor", value)} /><ColorField label="Cor secundária" value={config.secondaryColor} onChange={(value) => update("secondaryColor", value)} /><ColorField label="Cor de fundo" value={config.backgroundColor} onChange={(value) => update("backgroundColor", value)} /></div></div></>}
        {section === "hero" && <><div><h3 className="font-display text-lg font-semibold">Conteúdo do banner principal</h3><div className="mt-5 space-y-5"><Field label="Título principal" hint={`${config.heroTitle.length}/80 caracteres`} full><Input value={config.heroTitle} onChange={(value) => update("heroTitle", value)} placeholder="Título do banner" /></Field><Field label="Descrição" hint={`${config.heroDescription.length}/200 caracteres`} full><Textarea value={config.heroDescription} onChange={(value) => update("heroDescription", value)} placeholder="Descrição da loja" /></Field><ImageUpload label="Imagem do banner" hint="Recomendado: 1600x900px." value={config.heroImage} onChange={(value) => update("heroImage", value)} /></div></div><div className="overflow-hidden rounded-lg p-6" style={{ backgroundColor: config.primaryColor }}><p className="text-xs font-semibold uppercase tracking-widest" style={{ color: config.accentColor }}>Artesanato em madeira</p><h3 className="mt-3 max-w-lg font-display text-2xl font-semibold" style={{ color: config.backgroundColor }}>{config.heroTitle || "Título do banner"}</h3><p className="mt-2 max-w-lg text-sm" style={{ color: `${config.backgroundColor}99` }}>{config.heroDescription}</p></div></>}
        {section === "info" && <><Field label="Descrição da loja" hint="Texto institucional exibido na página Sobre." full><Textarea value={config.storeDescription} onChange={(value) => update("storeDescription", value)} rows={5} placeholder="Conte a história da sua loja..." /></Field><div className="border-t border-border pt-8"><h3 className="font-display text-lg font-semibold">Contato e endereço</h3><div className="mt-5 grid gap-5 sm:grid-cols-2"><Field label="Telefone"><Input value={config.phone} onChange={(value) => update("phone", value)} type="tel" /></Field><Field label="E-mail"><Input value={config.email} onChange={(value) => update("email", value)} type="email" /></Field><Field label="WhatsApp"><Input value={config.whatsapp} onChange={(value) => update("whatsapp", value)} type="tel" /></Field><Field label="Rua / Avenida"><Input value={config.address} onChange={(value) => update("address", value)} /></Field><Field label="Cidade"><Input value={config.city} onChange={(value) => update("city", value)} /></Field><Field label="Estado"><select value={config.state} onChange={(event) => update("state", event.target.value)} className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm focus:border-ring focus:outline-none">{states.map((state) => <option key={state}>{state}</option>)}</select></Field></div></div></>}
        {section === "social" && <><h3 className="font-display text-lg font-semibold">Redes sociais</h3><div className="mt-5 space-y-5"><Field label="Instagram" hint="Nome de usuário sem @."><Input value={config.instagram} onChange={(value) => update("instagram", value)} placeholder="casamadeira" /></Field><Field label="Facebook"><Input value={config.facebook} onChange={(value) => update("facebook", value)} placeholder="casamadeira" /></Field><Field label="Link do WhatsApp"><Input value={config.whatsappLink} onChange={(value) => update("whatsappLink", value)} type="url" /></Field><Field label="Outros links" hint="Um link por linha." full><Textarea value={config.otherLinks} onChange={(value) => update("otherLinks", value)} rows={4} /></Field></div></>}
        {section === "footer" && <><Field label="Mensagem do rodapé" full><Textarea value={config.footerMessage} onChange={(value) => update("footerMessage", value)} rows={4} /></Field><Field label="Texto de direitos autorais" hint="Use {year} para o ano automático." full><Input value={config.copyright} onChange={(value) => update("copyright", value)} /></Field><div className="rounded-lg p-6" style={{ backgroundColor: config.primaryColor }}><p className="font-display text-xl font-semibold" style={{ color: config.backgroundColor }}>{config.storeName}</p><p className="mt-2 max-w-sm text-sm" style={{ color: `${config.backgroundColor}99` }}>{config.footerMessage}</p></div></>}
    </fieldset><div className="flex justify-end border-t border-border px-6 py-5"><button type="button" disabled={loading || saving} onClick={() => { setConfig(defaultStoreConfig); setSaved(false); setMessage(""); }} className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary disabled:opacity-50"><RotateCcw size={15} /> Restaurar padrão</button></div></div>;
}