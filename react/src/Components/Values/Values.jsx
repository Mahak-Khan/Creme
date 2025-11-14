import React from 'react'
import Heading from '../Heading/Heading'
import { FaHeart, FaShieldAlt, FaSeedling } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import Basket from '../../Assets/basket-full-vegetables.png' 

const Values = () => {

   const leftValues = value.slice(0,2).map(item => {
    return(
        <div key={item.id} className='flex md:flex-row-reverse items-center gap-7'>
            <div>
                <span className='flex justify-center items-center text-3xl text-white bg-gradient-to-b from-rose-400 to-rose-500 w-15 h-15 rounded-full'>{item.icon}</span>
            </div>
            <div className='md:text-right'>
                <h3 className='text-zinc-800 text-3xl font-bold'>{item.title}</h3>
                <p className='text-zinc-600 mt-2'>{item.para}</p>
            </div>
        </div>
    )
   })
   const rightValues = value.slice(2).map(item => {
    return(
        <div key={item.id} className='flex items-center gap-7'>
            <div>
                <span className='flex justify-center items-center text-3xl text-white bg-gradient-to-b from-rose-400 to-rose-500 w-15 h-15 rounded-full'>{item.icon}</span>
            </div>
            <div>
                <h3 className='text-zinc-800 text-3xl font-bold'>{item.title}</h3>
                <p className='text-zinc-600 mt-2'>{item.para}</p>
            </div>
        </div>
    )
   })

    return (
        <section>
            <div className='max-w-[1400px] mx-auto px-10 py-20'>
                <Heading highlight="Our" heading="Value"/>
                <div className='flex md:flex-row flex-col gap-15 md:gap-5 mt-15'>

                    {/* left values*/}
                    <div className='md:min-h-100 gap-15 flex flex-col justify-between'>
                        {leftValues}
                    </div>

                    {/* center */}  
                    <div className='md:flex w-1/2 hidden'>
                        <img src={Basket}/>
                    </div>

                    {/* right values*/}
                    <div className='md:min-h-100 gap-15 flex flex-col justify-between'>
                        {rightValues}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Values

const value = [
    { 
        id: 1, 
        title: 'Love in Every Bite', 
        para: 'Each treat is handcrafted with care and sprinkled with love to make every bite delightful.', 
        icon: <FaHeart/> 
    },
    { 
        id: 2, 
        title: 'Freshly Baked', 
        para: 'Our cakes, pastries, and breads are baked daily to ensure maximum freshness and flavor.', 
        icon: <MdOutlineBakeryDining /> 
    },
    { 
        id: 3, 
        title: 'Premium Ingredients', 
        para: 'We use only the finest ingredients—real butter, fresh fruits, and high-quality chocolate in every creation.', 
        icon: <MdWorkspacePremium /> 
    },
    { 
        id: 4, 
        title: 'Handmade with Care', 
        para: 'Every dessert is carefully crafted by our skilled bakers to bring joy and sweetness to your day.', 
        icon: <FaSeedling/> 
    }
]
