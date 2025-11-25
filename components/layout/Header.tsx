'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react'

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Branding & Signmaking',
        href: '/branding',
        description: 'Komplexné riešenia pre vizuálnu identitu vašej firmy.',
    },
    {
        title: 'Priemyselné riešenia',
        href: '/priemysel',
        description: 'Funkčné textílie, deliace steny a haly pre priemysel.',
    },
    {
        title: 'Outdoor Living',
        href: '/tienenie',
        description: 'Pergoly, markízy a tienenie pre váš domov.',
    },
    {
        title: 'Materiály & Príslušenstvo',
        href: '/materialy',
        description: 'Kvalitné materiály pre vaše projekty.',
    },
]

export function Header() {
    const t = useTranslations('Navigation');
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex items-center gap-6">
                    <Link href="/" className="font-bold text-xl mr-4">
                        Bamida
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        {t('about')}
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                        {t('contact')}
                    </Link>
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                            {t('products')} <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Riešenia</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Bamida Engineering
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Inžinierstvo vášho priestoru. Od priemyselných hál po luxusné pergoly.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/branding" title="Pre podnikanie (B2B)">
                                            Branding, polepy a svetelná reklama.
                                        </ListItem>
                                        <ListItem href="/priemysel" title="Pre priemysel (B2B)">
                                            Deliace steny, haly a technické textílie.
                                        </ListItem>
                                        <ListItem href="/tienenie" title="Pre domov (B2C)">
                                            Pergoly, markízy a outdoor living.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/referencie" className={navigationMenuTriggerStyle()}>
                                        Referencie
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/kontakt" className={navigationMenuTriggerStyle()}>
                                        Kontakt
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Hľadať..." className="pl-8 w-[200px] lg:w-[300px]" />
                        </div>
                    </div>
                    <nav className="flex items-center">
                        <Link href="/contact">
                            <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                Získať ponuku
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
