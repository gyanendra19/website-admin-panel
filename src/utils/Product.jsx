import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const Product = ({product, path, setProduct, title}) => {
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, `data/products/${path}`), (snapshot) => {
            if(snapshot !== null){
                setProduct(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'head' && setProduct(prev => ({...prev, head: update}))
        selector === 'image' && setProduct(prev => ({...prev, image: update}))
        selector === 'para1' && setProduct(prev => ({...prev, para1: update}))
        selector === 'para2' && setProduct(prev => ({...prev, para2: update}))
        selector === 'para3' && setProduct(prev => ({...prev, para3: update}))
        selector === 'para4' && setProduct(prev => ({...prev, para4: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, `data/products/${path}`), product);
        success = true
        if(success) alert('Date Changed')
    }



  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>{title} <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
        <div className={`${showSection ? '' : 'hidden'}`}>
        {Object.keys(product).length !== 0 && Object.keys(product || {}).map(key => (
                <>
                    {Object.keys(product).length !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={product[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={product[key]} alt="" />
                                    )}
                            </div>
                        </div>
                    )}
                </>
            ))}
            <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => writeUserData()}>Change</button>
        </div>
    </Fragment>
  )
}

export default Product