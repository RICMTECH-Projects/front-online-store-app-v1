"use client"

import { ProductCard } from "../landing/ProductCard";
import { SectionHeading } from "../ui/SectionHeading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ChevronDown } from 'lucide-react';

export default function ProductGrid(){
    return(
        <div>
            <SectionHeading
                title="NUEVOS LANZAMIENTOS"
                description="DESTACA CON NUESTRA ULTIMA COLECCION: DISEÑOS 
                    AUDACES, TELAS PRIMIUM Y UN ESTILO URBANO 
                    LISTO PARA LA CALLE"
            />
            <div className="mt-5 flex items-center justify-between">
                <Sheet>
                <SheetTrigger className="flex items-center">
                    <p>Filtro</p>
                    <ChevronDown size={20}/>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                </SheetContent>
                </Sheet>

                <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Más vendidos</SelectItem>
                    <SelectItem value="2">Precio, menor a mayor</SelectItem>
                    <SelectItem value="3">Precio, mayor a menor</SelectItem>
                    <SelectItem value="4">Más reciente</SelectItem>
                    <SelectItem value="5">Más antiguo</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4
                        lg:grid-cols-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index}>
                        <ProductCard
                            title = {index+1 +" SHADOW DRIP"}
                            description="URBAN PHANTOM - A BOLD, OVERSIZED HODDIE WITH
                                EDGY FRAPHICS AND A STEAKTHY AESTHETIC INSPIRED
                                BY CITY NIGHTS"
                            price = {150}
                            oldPrice= {180}
                            image="/landing/newreleases.png"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}