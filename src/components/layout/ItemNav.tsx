type NavProps = {
    title: string,
    href: string
}

export default function ItemNav({ title, href }: NavProps) {
    return (
        <a href={href} className="text-gray-600 text-sm hover:text-accent">
            {title}
        </a>
    )
}