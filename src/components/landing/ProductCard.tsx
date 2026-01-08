import Image from "next/image"

type ProductCardProps = {
    title: string
    description: string
    price: number
    oldPrice ?: number
    image: string
}

export function ProductCard({
    title,
    description,
    price,
    oldPrice,
    image
}: ProductCardProps){
    return (
        <article>
            <div className="relative aspect-2/3 overflow-hidden">
                <Image
                src={image}
                alt={title+".png"}
                fill
                priority
                className="object-cover"/>
            </div>
            <div className="@container">
                <h3 className="mt-3 font-anton text-xl @3xs:text-2xl">{title}</h3>
                <p className="mt-3 text-xs text-gray-400">
                    {description}
                </p>
                <p className="mt-2 text-l font-bold">
                    ${price+" "}
                    {oldPrice &&(
                        <span className="text-gray-400 font-normal line-through">
                            ${oldPrice}
                        </span>
                    )}
                </p>
            </div>
        </article>
    )
}