type CardProps = {
    name: string,
    price: number,
    description: string,
    image: string
}

export default function Card({ name, price, description, image }: CardProps) {
    return (
        <div className="border rounded-2xl bg-white">
            <img src={image} className="rounded-t-2xl"/>
            <div className="p-3">
                <p>{name}</p>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}