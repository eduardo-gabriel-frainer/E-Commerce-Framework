import Button from "@/components/ui/Button";
import { ShoppingCart, } from "lucide-react";

export default function Cart() {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center gap-2">
            <div className="flex">
                <div className="rounded-full p-4 bg-gray-400">
                    <ShoppingCart></ShoppingCart>
                </div>
            </div>
            <h3 className="text-3xl">Seu carrinho está vazio</h3>

            <p>Adicione produtos para continuar sua compra.</p>
            <div className="flex">

                <Button title='Ver produtos' color="primary"></Button>

            </div>
        </div>
    )
}