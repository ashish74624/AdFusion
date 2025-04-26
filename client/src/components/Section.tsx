import { ReactNode } from 'react'
import { twMerge } from "tailwind-merge"; 
import clsx from "clsx";
import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface Props extends ScrollAreaProps {
    children: ReactNode;
    className?: string;
}

export default function Section({ children, className, ...rest }: Props) {
    return (
        <section className={twMerge(clsx("bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative overflow-hidden w-full h-full p-6", className))}   {...rest}>
            {children}
        </section>
    )
}
