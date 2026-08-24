import { cn } from '@/lib/utils/cn';
import { ButtonColor } from '@/types/types'
import type { LucideIcon } from 'lucide-react'

type buttonProps = {
    title: string,
    icon?: LucideIcon,
    color: ButtonColor,
    className?: string
}

const buttonColors: Record<ButtonColor, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary)_90%,white)]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_srgb,var(--secondary)_90%,black)]",
    accent: "bg-accent text-accent-foreground hover:bg-[color-mix(in_srgb,var(--accent)_90%,black)]",
    muted: "bg-muted text-muted-foreground hover:bg-[color-mix(in_srgb,var(--muted)_90%,black)]",
};

export default function Button({ title, color, icon: Icon, className }: buttonProps) {
    return (
        <button className={cn('flex items-center justify-center p-2 gap-2 rounded-sm transition-colors text-sm,', className, buttonColors[color])}>
            {Icon && <Icon size={20}></Icon>}
            {title}
        </button>
    )
}