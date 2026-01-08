import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";


export function PromoSection(){
    return(
        <section className="w-full font-inter mt-10">
            <SectionHeading
                title="COMPRA INTELIGENTE, RECIBE RÁPIDO, VIVE CON ESTILO"
                description="TE CONECTAMOS CON PRODUCTOS ÚNICOS Y ENTREGAS SIN DEMORAS,
                TU TIEMPO VALE, Y TU LOOK TAMBIÉN."
            />
            <div className="mt-3 mb-10 grid grid-rows-4 grid-cols-1 gap-3
                md:mt-6 md:grid-cols-2 md:grid-rows-2 md:gap-5
                lg:mt-10 lg:gap-8
                xl:grid-cols-3
                ">
                <div className="relative xl:aspect-21/10 xl:col-span-2">
                    <Image 
                        src="/landing/promo1.png"
                        alt="promo1"
                        fill
                        priority
                        className="object-cover rounded-4xl"
                    />
                </div>
                <div className="bg-[#121212] rounded-4xl p-5 flex flex-col justify-end md:p-8">
                    <p  className="font-antonio text-white text-xl md:text-2xl">EXPLORA NUESTRAS COLECCIONES</p>
                    <p className="mt-3 text-[#B1B1B1] text-xs md:text-sm">
                        SUMERGETE EN NUESTRAS COLECCIONES
                        CUIDADOSAMENTE SELECCIONADAS. PRENDAS Y
                        ESTILOS PENSADOS PARA QUIENES VALORAN LA
                        AUTENTICIDAD Y LA CALIDAD.
                    </p>
                    <Link href="/" className="mt-3 inline-flex items-center bg-white py-1 px-1 text-black rounded-4xl hover:bg-gray-200 self-start">
                        <p className="px-3 text-sm md:text-base">Ver colecciones</p>
                        <ArrowRight size={20} className="bg-black text-white rounded-full h-auto w-auto p-2"/>
                    </Link>
                </div>
                <div className="bg-[#E8E8E8] rounded-4xl p-5 flex flex-col justify-end md:p-8">
                    <p className="font-antonio text-black text-xl sm:text-2xl">ENCUENTRA TU ESTILO</p>
                    <p className="mt-3 text-[#505050] text-xs md:text-sm">
                        NAVEGA POR NUESTRAS CATEGORIAS Y DESCRUBRE LO
                        QUE MEJOR SE ADAPTA A TI. DESDE MODA CASUAL 
                        HASTA PIEZAS PREMIUM, TODO EN UN SOLO LUGAR.
                    </p>
                    <Link href="/" className="mt-3 inline-flex items-center bg-black text-white py-1 px-1 rounded-4xl self-start">
                        <p className="px-3 text-sm lg:text-base">Ver colecciones</p>
                        <ArrowRight size={20} className="bg-white text-black rounded-full h-auto w-auto p-2"/>
                    </Link>
                </div>
                <div className="relative xl:aspect-21/10 xl:col-span-2">
                    <Image
                        src="/landing/hero.png"
                        alt="promo1"
                        fill
                        priority
                        className="object-cover rounded-4xl"
                    />
                </div>
            </div>
        </section>
    )
    
}