"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Apple, LucideShoppingCart, Heart, User } from "lucide-react"

export default function Navbar() {
    return(
        <header className="w-full">
            <nav className="flex items-center justify-between p-5 sm:px-20 lg:px-30">
                <Link href="/" className=" flex items-center gap-1">
                    <Apple size={30} aria-hidden="true"/>
                    <span className="text-2xl font-anton">EXAMPLE</span>
                </Link>
                <NavigationMenu className="hidden lg:flex font-antonio">
                    <NavigationMenuList className="gap-6">
                        <NavigationMenuItem>
                            <NavigationMenuLink className="text-xl" asChild>
                                <Link href="/" >
                                    INICIO
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">COLECCION</NavigationMenuTrigger>
                            <NavigationMenuContent>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className="text-xl" asChild>
                                <Link href="/Categorias">
                                    CATEGORÍAS
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className="text-xl" asChild>
                                <Link href="/">
                                    NOSOTROS
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <Link href="/" aria-label="Ver Carrito">
                        <LucideShoppingCart className="h-6 w-6" />
                    </Link>

                    <Link href="/" aria-label="Ver Favoritos">
                        <Heart className="h-6 w-6"/>
                    </Link>


                    <Link href="/login" aria-label="Ver Usuario">
                        <User className="h-6 w-6" />
                    </Link>
                </div>
            </nav>
        </header>
    )
}
