"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, LayoutDashboard, LogOut, Package, Store } from "lucide-react";
import AdminProducts from "./AdminProducts";
import AdminSettings from "./AdminSettings";
import { AdminSection } from "@/types/admin";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
    const [access, setAccess] = useState<"checking" | "signed-out" | "not-admin" | "allowed" | "error">("checking");
    const [accessError, setAccessError] = useState("");
    const [view, setView] = useState<"store" | "products">("store"); const [section, setSection] = useState<AdminSection>("identity"); const [open, setOpen] = useState(true);

    useEffect(() => {
        let active = true;
        const supabase = createClient();

        const checkAccess = async () => {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (!active) return;

            if (!user && (!authError || authError.name === "AuthSessionMissingError")) {
                setAccess("signed-out");
                return;
            }
            if (authError) {
                setAccessError(authError.message);
                setAccess("error");
                return;
            }
            if (!user) return;

            const { data, error } = await supabase
                .from("store_admins")
                .select("user_id")
                .eq("user_id", user.id)
                .maybeSingle();
            if (!active) return;

            if (error) {
                setAccessError(error.message);
                setAccess("error");
            } else {
                setAccess(data ? "allowed" : "not-admin");
            }
        };

        checkAccess().catch((error: unknown) => {
            if (!active) return;
            setAccessError(error instanceof Error ? error.message : "Não foi possível verificar o acesso.");
            setAccess("error");
        });
        return () => {
            active = false;
        };
    }, []);

    if (access === "checking") {
        return <main className="mx-auto flex min-h-screen max-w-7xl items-center px-6"><p role="status">Verificando acesso...</p></main>;
    }
    if (access === "signed-out") {
        return <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="font-display text-2xl font-semibold">Entre para acessar o painel</h1><a href="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ir para o login</a></main>;
    }
    if (access === "not-admin") {
        return <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="font-display text-2xl font-semibold">Acesso não autorizado</h1><p className="text-sm text-muted-foreground">Esta conta ainda não foi cadastrada como administradora da loja.</p><a href="/" className="text-sm underline">Voltar à loja</a></main>;
    }
    if (access === "error") {
        return <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="font-display text-2xl font-semibold">Não foi possível verificar o acesso</h1><p role="alert" className="text-sm text-red-700">{accessError}</p></main>;
    }

    const signOut = async () => {
        const { error } = await createClient().auth.signOut();
        if (error) {
            setAccessError(error.message);
            setAccess("error");
            return;
        }
        setAccess("signed-out");
    };

    return <main className="min-h-screen bg-background"><div className="border-b border-primary/20 bg-primary text-primary-foreground"><div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6"><a href="/" className="flex items-center gap-2 text-xs text-primary-foreground/70 hover:text-primary-foreground"><ArrowLeft size={14} /> Ver loja</a><span className="text-xs text-primary-foreground/70">Painel administrativo · Casa & Madeira</span><button type="button" onClick={signOut} className="flex items-center gap-2 text-xs text-primary-foreground/70 hover:text-primary-foreground"><LogOut size={14} /> Sair</button></div></div><div className="mx-auto max-w-7xl px-6 py-10"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Administrativo</p><h1 className="mt-1 font-display text-3xl font-semibold">{view === "products" ? "Gestão de produtos" : "Configuração da loja"}</h1><p className="mt-2 text-sm text-muted-foreground">Personalize sua loja e organize o catálogo.</p></div><div className="flex flex-col gap-8 lg:flex-row"><aside className="shrink-0 lg:w-60"><nav className="space-y-1 lg:sticky lg:top-6"><button type="button" onClick={() => { setView("store"); setOpen((value) => !value); }} className={`flex w-full items-center justify-between rounded-md px-3.5 py-2.5 text-left text-sm font-semibold ${view === "store" ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-secondary"}`}><span className="flex items-center gap-3"><Store size={17} /> Estabelecimento</span><ChevronDown size={15} className={open && view === "store" ? "rotate-180" : ""} /></button>{open && view === "store" && <div className="ml-3 space-y-1 border-l border-border pl-3">{[{ id: "identity", label: "Identidade da loja" }, { id: "hero", label: "Página inicial" }, { id: "info", label: "Informações da loja" }, { id: "social", label: "Contato e redes sociais" }, { id: "footer", label: "Rodapé" }].map((item) => <button type="button" key={item.id} onClick={() => setSection(item.id as AdminSection)} className={`w-full rounded-md px-3 py-2 text-left text-sm ${section === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{item.label}</button>)}</div>}<button type="button" onClick={() => { setView("products"); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 text-left text-sm font-semibold ${view === "products" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}><Package size={17} /> Produtos</button><a href="/" className="flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"><LayoutDashboard size={17} /> Voltar ao início</a></nav></aside><div className="min-w-0 flex-1">{view === "products" ? <AdminProducts /> : <AdminSettings section={section} />}</div></div></div></main>;
}