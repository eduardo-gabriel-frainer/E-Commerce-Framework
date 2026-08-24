export default function GridCards() {
    const products = [
        {
            id: 1,
            name: "Tábua de Churrasco Grande",
            price: 189.90,
            description: "Tábua artesanal de madeira maciça, ideal para churrascos e grandes cortes.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 2,
            name: "Tábua Rústica Premium",
            price: 159.90,
            description: "Peça rústica com acabamento natural, perfeita para servir carnes e petiscos.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 3,
            name: "Tábua para Petiscos",
            price: 119.90,
            description: "Compacta e elegante, ideal para servir queijos, frios, pães e aperitivos.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 4,
            name: "Tábua Artesanal Natural",
            price: 139.90,
            description: "Produzida artesanalmente em madeira natural com acabamento suave.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 5,
            name: "Tábua de Corte Clássica",
            price: 89.90,
            description: "Modelo clássico para cortes do dia a dia, resistente e fácil de limpar.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 6,
            name: "Tábua com Canaleta",
            price: 169.90,
            description: "Possui canaleta para líquidos, ideal para carnes suculentas e churrascos.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 7,
            name: "Tábua de Madeira Nobre",
            price: 219.90,
            description: "Madeira selecionada e acabamento premium para uma peça única na cozinha.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 8,
            name: "Tábua para Churrasco",
            price: 129.90,
            description: "Tamanho versátil para preparar e servir carnes, acompanhamentos e petiscos.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
        {
            id: 9,
            name: "Tábua Premium Grande",
            price: 249.90,
            description: "Peça robusta com amplo espaço para cortes e apresentação à mesa.",
            image: "https://down-br.img.susercontent.com/file/br-11134207-820mf-mmkncc7ohtl071",
        },
    ];

    return (
        <div className="grid grid-cols-3">
            {products.map((product) => (
                <p key={product.id}>{product.name}</p>
            ))}
        </div>
    )
}