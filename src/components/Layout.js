import React from 'react'
import Header from './Header'
import ProductCard from './ProductCard'

const Layout = ({ handleLogout }) => {
  const [products, setProducts] = React.useState([])
  const [cart, setCart] = React.useState([])

  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }

  React.useEffect(() => {
    fetch('http://localhost:6180/products', { headers: header })
      .then(res => res.json())
      .then(json => setProducts(json))
  }, [])

  const addToCart = async (id) => {
    await fetch(`http://localhost:6180/cart?productId=${id}&quantity=${1}&userId=${localStorage.getItem("userId")}`
      , { headers: header, method: 'POST' })


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
        <Header cart={cart} handleLogout={handleLogout} />
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