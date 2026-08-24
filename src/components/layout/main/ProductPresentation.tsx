import { cn } from "@/lib/utils/cn"
import Button from "../../ui/Button"

export default function ProductPresentation() {
    const label = 'ARTESANATO EM MADEIRA'
    const title = 'Produtos feitos para fazer parte da sua casa.'
    const description =
        'Peças únicas, produzidas à mão com madeiras certificadas. Do corte ao acabamento, cada detalhe é pensado para durar gerações.'
    const imageEmphasis = 'https://blog.sociedadedacarne.com.br/wp-content/uploads/2019/02/shutterstock_483310876.jpg'
    const backgroundPresentation = 'bg-primary'

    return (
        <div className={cn(" px-6 py-10 md:py-40 sm:px-10 lg:px-16", backgroundPresentation)}>
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between">

                <div className="max-w-xl text-white">
                    <p className="font-bold text-accent">
                        {label}
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>

                    <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                        {description}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row w-100">
                        <Button
                            title="Comprar agora"
                            color="accent"
                            className="flex-1 py-3 px-5 font-bold text-sm"
                        />

                        <Button
                            className="flex-1 border py-3 px-5 font-bold text-sm"
                            title="Ver coleção"
                            color="primary"
                        />
                    </div>
                </div>

                <div className="relative w-full max-w-md lg:max-w-lg">
                    <img
                        className="w-full rounded-2xl object-cover"
                        src={imageEmphasis}
                        alt="Tábua de churrasco"
                    />

                    <div className="relative -mt-5 ml-4 w-60 rounded-2xl bg-white p-4 shadow-lg sm:ml-6">
                        <p className="font-bold">
                            Tábua de Churrasco Grande
                        </p>

                        <p className="font-bold text-accent">
                            R$ 189,90
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}