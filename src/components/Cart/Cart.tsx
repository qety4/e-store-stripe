'use client'
import { FC, useContext } from 'react'
import CartContext from '../providers/CartContext'
import ProductCard from '../Product_Card/ProductCard'
import { useRouter } from 'next/navigation'
import { checkout } from '@/lib/util/checkout'


interface CartProps {

}

const Cart: FC<CartProps> = ({ }) => {
    const { items } = useContext(CartContext)
    const router = useRouter()

    return items && (
        <div>
            <h3>CART ITEMS</h3>
            <div>
                {
                    items?.map((p, i) =>
                    //checkout component
                        <ProductCard key={p.id + `${i}`} price={p} />
                    )
                }
            </div>
            <button onClick={()=>checkout(items,router)}>CHECKOUT</button>
        </div>
    )

}

export default Cart