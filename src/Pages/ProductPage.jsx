import React, { useState } from 'react'
import FirstProduct from '../components/FirstProduct'
import Product from '../utils/Product'

const ProductPage = () => {
    const [firstProduct, setFirstProduct] = useState({})
    const [secondProduct, setSecondProduct] = useState({})
    const [thirdProduct, setThirdProduct] = useState({})
    const [fourthProduct, setFourthProduct] = useState({})

  return (
    <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
               <Product product={firstProduct} path = {'firstProduct'} setProduct={setFirstProduct} title = {'First Product'}/>
               <Product product={secondProduct} path = {'secondProduct'} setProduct={setSecondProduct} title = {'Second Product'}/>
               <Product product={thirdProduct} path = {'thirdProduct'} setProduct={setThirdProduct} title = {'Third Product'}/>
               <Product product={fourthProduct} path = {'fourthProduct'} setProduct={setFourthProduct} title = {'Fourth Product'}/>
            </div>
        </section>
  )
}

export default ProductPage