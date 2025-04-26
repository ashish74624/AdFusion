import { ReactNode } from 'react'
import { twMerge } from "tailwind-merge"; // make sure to install tailwind-merge
import clsx from "clsx";
import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface Props extends ScrollAreaProps {
    children: ReactNode;
    className?: string;
}

export default function Section({ children, className, ...rest }: Props) {
    return (
        <section className={twMerge(clsx("min-h-96 md:min-h-[40rem] lg:min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden", className))}   {...rest}>
            {children}
        </section>
    )
}
