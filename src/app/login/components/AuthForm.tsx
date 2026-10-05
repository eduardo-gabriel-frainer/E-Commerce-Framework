"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const signIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setErrorMessage("");

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setErrorMessage(error.message);
                return;
            }

            router.replace("/admin");
            router.refresh();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Não foi possível entrar.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
            <form onSubmit={signIn} className="w-full space-y-5 rounded-xl border border-border bg-card p-8">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Casa & Madeira</p>
                    <h1 className="mt-2 font-display text-2xl font-semibold">Entrar no painel</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Use a conta de administrador cadastrada no Supabase.</p>
                </div>
                <label className="block text-sm font-medium">
                    E-mail
                    <input
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2.5"
                    />
                </label>
                <label className="block text-sm font-medium">
                    Senha
                    <input
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2.5"
                    />
                </label>
                {errorMessage && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                    {submitting ? "Entrando..." : "Entrar"}
                </button>
                <a href="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">Voltar à loja</a>
            </form>
        </main>
    );
}