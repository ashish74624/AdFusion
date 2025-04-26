import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar"
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { People, Terminal,Tv } from 'react-bootstrap-icons';
import {Toaster} from "react-hot-toast"
import Section from "@/components/Section";

export default function Admin() {
    const links = [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: (
                <Terminal className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Publisher",
            href: "/admin/publisher",
            icon: (
                <Tv className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Advertisers",
            href: "/admin/advertiser",
            icon: (
                <People className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        }
    ];
    const [open, setOpen] = useState(false);
    return (
        <section className="flex min-h-screen bg-background text-foreground">
            <aside
                className={cn(
                    "mx-auto flex w-max flex-col overflow-hidden md:flex-row ",
                    "h-screen",
                )}
            >
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                    </SidebarBody>
                </Sidebar>
                {/* <Dashboard /> */}
            </aside>
            <Section className="flex-1 h-screen ">
                <Outlet />
            </Section>
           <Toaster/>
        </section>
    );
}
export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                AdFusion
            </motion.span>
        </a>
    );
};
export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};

// // Dummy dashboard component with content

