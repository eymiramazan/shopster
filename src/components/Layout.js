import React from 'react'
import Header from './Header'
import ProductCard from './ProductCard'

const Layout = () => {
  const [products, setProducts] = React.useState([])
  const [cart, setCart] = React.useState([])

  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=10')
      .then(res => res.json())
      .then(json => setProducts(json))
  }, [])

  const addToCart = (id) => {
    const cartItem = {
      id,
      quantity: 1,
      product: products.find(product => product.id === id)
    }
    const newCart = [...cart, cartItem]
    setCart(newCart)
    console.log("aa", newCart)
  }

  return (
    <div>
      <header>
        <Header cart={cart} />
      </header>
      <main className='container mx-auto'>
        <div className='grid grid-cols-4 gap-4'>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Layout