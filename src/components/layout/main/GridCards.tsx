import Card from "./Card";
import { createClient } from "@/lib/supabase/server";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

export default async function GridCards() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select("*")

    if (error) {
        console.log(error)
        return 'Erro ao Buscar produtos'
    }

    return (
        <div id="produtos">
            <div className="mx-auto max-w-300">

                <h3 className="mt-10 text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Produtos em destaque
                </h3>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 my-10">
                    {products.map((product: Product) => (
                        <Card
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}