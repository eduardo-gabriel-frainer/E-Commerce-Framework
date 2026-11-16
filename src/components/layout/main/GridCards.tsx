import Card from "./Card";
import { createClient } from "@/lib/supabase/server";
import { PackageOpen } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

export default async function GridCards() {
  const supabase = await createClient();

  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.log(error);
    return "Erro ao Buscar produtos";
  }

  return (
    <div id="produtos">
      <div className="mx-auto max-w-300">
        <h3 className="mt-10 text-2xl font-bold sm:text-3xl lg:text-4xl">
          Produtos em destaque
        </h3>

        {products.length > 0 ? (
          <div className="grid gap-10 my-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <Card
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <div className="my-10 flex flex-col items-center rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-14 text-center">
            <PackageOpen
              size={40}
              aria-hidden="true"
              className="text-stone-400"
            />
            <h4 className="mt-4 text-lg font-semibold text-stone-800">
              Novidades em breve
            </h4>
            <p className="mt-2 max-w-md text-sm leading-6 text-stone-600">
              Estamos preparando os produtos desta loja. Volte em breve para
              conferir as novidades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
