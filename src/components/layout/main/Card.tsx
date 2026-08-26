type CardProps = {
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    image: string;
};

export default function Card({
    name,
    price,
    oldPrice,
    description,
    image,
}: CardProps) {
    return (
        <div className="w-full overflow-hidden rounded-lg border border-stone-200 bg-white">

 
            <div className="aspect-square w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-3.5">


                <h3 className="font-serif text-[17px] font-semibold leading-tight text-stone-900">
                    {name}
                </h3>

                <p className="mt-2 text-[14px] leading-5 text-stone-600">
                    {description}
                </p>



                <div className="mt-4 flex items-end justify-between">

                    <div>
                        <p className="text-[18px] font-bold text-stone-900">
                            R$ {price.toFixed(2).replace(".", ",")}
                        </p>
                        {oldPrice && (
                            <p className="text-[12px] text-stone-500 line-through">
                                R$ {oldPrice.toFixed(2).replace(".", ",")}
                            </p>
                        )}
                    </div>

                    <button
                        className="rounded-md bg-[#321d15] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#43271c]"
                    >
                        + Carrinho
                    </button>

                </div>
            </div>
        </div>
    );
}