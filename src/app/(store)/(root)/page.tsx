import Image from 'next/image'
import './rootPage.scss'
import { getProducts } from '@/lib/stripe'
import ProductCard from '@/components/Product_Card/ProductCard'



export default async function Home() {

  const prices = await getProducts()

  return (
    <main>
      <div>
        <h3>PAGE ITEMS</h3>
        {
          prices.map(p => {
            console.log(p)
            return (
              <ProductCard key={p.id} price={p} />
            )
          }
          )
        }
      </div>
    </main>
  )
}
