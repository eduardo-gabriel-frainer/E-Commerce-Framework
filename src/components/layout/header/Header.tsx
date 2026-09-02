'use client'

import Button from "../../ui/Button";
import {
    ShoppingCart,
    User,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Home,
    Package,
    Info,
    Mail
} from "lucide-react";
import Nav from "./Nav";
import ItemNav from "./ItemNav";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-1">

            <div className="flex items-center gap-2">
                <img
                    className="max-h-10"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdAo2rZzw08S0RV5VevGLR-PRuehXvErkHmJBVhWnrw&s=10"
                    alt="Casa & Madeira"
                />

                <h2>Casa & Madeira</h2>
            </div>

            <div className="hidden items-center md:flex">
                <Nav>
                    <ItemNav href="/" title="Início" />
                    <ItemNav href="#produtos" title="Produtos" />
                    <ItemNav href="/" title="Sobre" />
                    <ItemNav href="/" title="Contato" />
                </Nav>
            </div>

            <div className="flex items-center gap-2">

                <button
                    type="button"
                    className="md:hidden"
                    onClick={() => setMobileMenu(true)}
                >
                    <Menu size={24} />
                </button>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <User
                            size={20}
                            className="mr-2 hover:text-accent"
                        />
                    </button>

                    {open && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpen(false)}
                            />

                            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-amber-900 bg-white shadow-lg">

                                <div className="border-b border-amber-900 px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Conta
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        João Artesão
                                    </p>
                                </div>

                                <div className="py-1">
                                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-100">
                                        <User size={16} />
                                        Minha conta
                                    </button>

                                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-accent hover:bg-accent/10">
                                        <LayoutDashboard size={16} />
                                        Gerenciar minha loja
                                    </button>
                                </div>

                                <div className="border-t border-amber-900 py-1">
                                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-black">
                                        <LogOut size={16} />
                                        Sair
                                    </button>
                                </div>

                            </div>
                        </>
                    )}
                </div>
                
                <a href="/Cart">
                    <Button
                        title="Carrinho"
                        color="primary"
                        icon={ShoppingCart}
                    />
                </a>


            </div>

            {mobileMenu && (
                <div className="fixed inset-0 z-50 bg-black/40 md:hidden">

                    <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">

                        <div className="flex items-center justify-between border-b px-5 py-4">

                            <h2 className="font-semibold">
                                Menu
                            </h2>

                            <button
                                type="button"
                                onClick={() => setMobileMenu(false)}
                            >
                                <X size={24} />
                            </button>

                        </div>

                        <nav className="flex flex-col gap-1 p-4">

                            <a
                                href="/"
                                onClick={() => setMobileMenu(false)}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
                            >
                                <Home size={20} />
                                Início
                            </a>

                            <a
                                href="#produtos"
                                onClick={() => setMobileMenu(false)}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
                            >
                                <Package size={20} />
                                Produtos
                            </a>

                            <a
                                href="/"
                                onClick={() => setMobileMenu(false)}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
                            >
                                <Info size={20} />
                                Sobre
                            </a>

                            <a
                                href="/"
                                onClick={() => setMobileMenu(false)}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
                            >
                                <Mail size={20} />
                                Contato
                            </a>

                        </nav>
                    </div>

                    <button
                        type="button"
                        aria-label="Fechar menu"
                        className="absolute inset-0 -z-10"
                        onClick={() => setMobileMenu(false)}
                    />

                </div>
            )}

        </header>
    );
}
