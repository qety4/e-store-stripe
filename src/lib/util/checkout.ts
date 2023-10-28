

export const checkout = async (items:Item[],router:any) => {
    try {

        const lineItems = items?.map(p => {
            return {
                price: p.id,
                quantity: p.quantity
            }
        })

        const res = await fetch('api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                lineItems: lineItems
            })
        })

        const b = await res.json();
        router.push(b.url)
    }
    catch (e) {
        console.log('error checking out', e)
    }

}