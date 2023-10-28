'use client'
import { FC, useContext } from 'react'
import Stripe from 'stripe'
import Image from 'next/image'
import CartContext from '../providers/CartContext'


interface ProductCardProps {
    price: Stripe.Price
}

const ProductCard: FC<ProductCardProps> = ({ price }) => {

    console.log('item', price)

    const { add, remove } = useContext(CartContext)

    const addToCart = (p: typeof price) => {
        if (add)
            return add(p)
    }
    const removeItem = (p: typeof price) => {
        if (remove)
            return remove(p)
    }


    return (
        <article>
            <div>
                <Image
                    // fill 
                    src={price.product.images[0]} width={200} height={200} alt={price.product.description} >

                </Image>
            </div>
            <div>
                <p>
                    {price.product.name} <b>{Number(price.unit_amount) / 100}</b>
                </p>
            </div>
            <div>
                <button onClick={() => addToCart(price)}>Add to Cart</button>
                <button onClick={() => removeItem(price)}>Remove</button>
            </div>
        </article>
    )

}

export default ProductCard