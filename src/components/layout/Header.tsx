import Button from "../ui/Button";
import { ShoppingCart, User } from "lucide-react"
import Nav from "./Nav";
import ItemNav from "./ItemNav";

export default function Header() {
    return (
        <div className="flex border-b justify-between px-8 py-4">
            <div className="flex gap-2 items-center">
                <img className="max-h-10" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdAo2rZzw08S0RV5VevGLR-PRuehXvErkHmJBVhWnrw&s=10'></img>
                <h2>Casa e Madeira</h2>
            </div>
            <div className="flex items-center">
                <Nav>
                    <ItemNav href="/" title="Início"></ItemNav>
                    <ItemNav href="/" title="Produtos"></ItemNav>
                    <ItemNav href="/" title="Sobre"></ItemNav>
                    <ItemNav href="/" title="Contato"></ItemNav>
                </Nav>
            </div>
            <div className="flex items-center gap-2">
                <User size={20}className="hover:text-accent"></User>
                <Button title="Carrinho" color="primary" icon={ShoppingCart}></Button>
            </div>
        </div>
    )
}