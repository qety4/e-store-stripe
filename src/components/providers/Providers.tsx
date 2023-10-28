import { FC } from 'react'
import { CartProvider } from './CartContext'


interface ProvidersProps {
    children: React.ReactNode
}


const Providers: FC<ProvidersProps> = ({ children }) => {

    return (
        <div>
            <CartProvider>
                {children}
            </CartProvider>
        </div>
    )

}

export default Providers