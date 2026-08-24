import { cn } from "@/lib/utils/cn"

export default function Footer() {
    const storeName = "Casa & Madeira"
    const logoIcon = "▲"
    const description =
        "Produtos artesanais de madeira feitos com cuidado e dedicação, direto para a sua casa."

    const navLinks = [
        { label: "Início", href: "#inicio" },
        { label: "Produto", href: "#produto" },
        { label: "Sobre", href: "#sobre" },
        { label: "Contato", href: "#contato" },
    ]

    const contactInfo = {
        email: "contato@casamadeira.com.br",
        phone: "(11) 98765-4321",
        location: "São Paulo, SP – Brasil",
    }

    const currentYear = new Date().getFullYear()
    const backgroundFooter = "bg-primary"

    return (
        <footer className={cn("px-6 py-12 text-white/80 text-sm", backgroundFooter)}>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 pb-10 border-b border-white/10 md:grid-cols-4">

                    <div className="space-y-4 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-accent text-white text-xs font-bold">{logoIcon}</span>
                            <span className="text-xl font-bold text-white">{storeName}</span>
                        </div>

                        <p className="text-xs leading-relaxed text-white/70 max-w-sm">{description}</p>
                    </div>

                    <div className="md:col-span-1 md:justify-self-end">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">Navegação</h3>
                        <ul className="space-y-2 text-xs">
                            {navLinks.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href} className="hover:text-white transition-colors">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-1 md:justify-self-end">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">Contato</h3>
                        <ul className="space-y-2 text-xs text-white/70">
                            <li>{contactInfo.email}</li>
                            <li>{contactInfo.phone}</li>
                            <li>{contactInfo.location}</li>
                        </ul>
                    </div>

                </div>

                <div className="pt-6 flex flex-col items-center justify-between gap-4 text-xs text-white/50 sm:flex-row">
                    <p>© {currentYear} {storeName}. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}