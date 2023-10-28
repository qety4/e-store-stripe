'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { ReactNode, FC, createContext, useState } from 'react'
import Stripe from 'stripe'


export type CartContextProps = {
    items?: Item[],
    remove?: (item:Stripe.Price) => void,
    add?: (item: Stripe.Price) => void,
}



const cartContextProps: CartContextProps = {
    items: [],
    remove: () => { },
    add: () => { }
}

const addCartItem = (cartItems:Item[], item:Item) => {

    const exists = cartItems.find(
        (cartItem) => cartItem.id === item.id
    );

    if (exists) {
        return cartItems.map(
            (cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity! + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...item, quantity: 1 }]
}

const removeCartItem = (cartItems:Item[], item:Item) => {

    const exists = cartItems.find(
        (cartItem) => cartItem.id === item.id
    );
    if (exists?.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== item.id)
    }
    return cartItems.map(
        (cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity! - 1 }
            : cartItem
    )

}


const CartContext = createContext(cartContextProps)



export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [items, SetItems] = useLocalStorage('cart',[])

    console.log('items',items)
    const remove = (item:Stripe.Price) => {
        SetItems(removeCartItem(items,item))
    }

    const add = (item: Stripe.Price) => {
        SetItems(addCartItem(items,item))
    }



    const value = {
        add,
        remove,
        items
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>

}

export default CartContext