type NavProps = {
    children: React.ReactNode
}

export default function Nav({ children }: NavProps){
    return (
        <div className="flex gap-6">
            {children}
        </div>
    )
}