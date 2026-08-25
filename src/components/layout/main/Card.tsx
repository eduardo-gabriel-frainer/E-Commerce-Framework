type CardProps = {
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    image: string;
    rating?: number;
    reviews?: number;
};

export default function Card({
    name,
    price,
    oldPrice,
    description,
    image,
    rating = 4.9,
    reviews = 143,
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

            {/* Informações */}
            <div className="p-3.5">


                {/* Nome */}
                <h3 className="font-serif text-[17px] font-semibold leading-tight text-stone-900">
                    {name}
                </h3>

                {/* Descrição */}
                <p className="mt-2 text-[14px] leading-5 text-stone-600">
                    {description}
                </p>

                {/* Avaliação */}
                <div className="mt-2 flex items-center gap-1">
                    <div className="flex text-[15px] text-orange-600">
                        ★★★★★
                    </div>

                    <span className="ml-1 text-xs text-stone-500">
                        {rating.toFixed(1)} ({reviews})
                    </span>
                </div>

                {/* Preço + botão */}
                <div className="mt-4 flex items-end justify-between">

                    <div>
                        {/* Preço atual */}
                        <p className="text-[18px] font-bold text-stone-900">
                            R$ {price.toFixed(2).replace(".", ",")}
                        </p>

                        {/* Preço antigo */}
                        {oldPrice && (
                            <p className="text-[12px] text-stone-500 line-through">
                                R$ {oldPrice.toFixed(2).replace(".", ",")}
                            </p>
                        )}
                    </div>

                    {/* Botão */}
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