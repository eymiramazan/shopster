import React from 'react'

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className='border-solid border-2 border-gray-200 rounded-xl hover:border-gray-400'>
      <div className="mx-auto px-4 mt-3">
        <div className="group relative">
          <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
            <img src={`https://picsum.photos/200/300?random=${product.id}`} alt="Front of men&#039;s Basic Tee in black." className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
          </div>
          <div className="mt-4 justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.productName.slice(0, 25)}
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.discription.slice(0, 25)}</p>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button onClick={
            () => addToCart(product.id)
          } className=' bg-blue-500 hover:bg-blue-700 text-white text-center p-1 mb-3 h-min rounded-lg' type='submit'>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard