type SectionHeadingPage = {
    title: string
    description ?: string
    className ?: string
}

/*MODELO Y ESTILO PARA LOS SUBTITULOS*/
export function SectionHeading({
    title, 
    description, 
    className = ""
}: SectionHeadingPage){
    return (
        <div className={`md:max-w-md lg:max-w-2xl ${className}`}>
            <h2 className="font-antonio text-4xl leading-snug md:text-5xl lg:text-6xl">
                {title}
            </h2>
            {description && (
                <p className="mt-2 text-xs md:mt-4 md:text-sm">
                {description}
            </p>
            )}
            
        </div>
    )
}