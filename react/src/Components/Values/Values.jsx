import React from 'react'
import Heading from '../Heading/Heading'
import {FaHeart, FaLeaf, FaShieldAlt, FaSeedling } from "react-icons/fa";
import Basket from '../../Assets/basket-full-vegetables.png'

const Values = () => {

    const leftValues = value.slice(0,2).map(item => {
        return(
            <div className='flex flex-row-reverse'>
                <div>
                    <span className=' flex justify-center items-center textbg-gradient-to-b from-orange-400 to-orange-500 w-15 h-15 rounded-full'>{item.icon}</span>
                </div>
                <div className='text-right'>
                    <h3>{item.title}</h3>
                    <p>{item.para}</p>
                </div>
            </div>
        )
    })
return (
    <section>
        <div className='max-w-[1400px] mx-auto px-10 py-20'>
            <Heading highlight="Our" heading="Value"/>

            <div className='flex'>

                {/* Left Values */}

                <div>
                    {leftValues}
                </div>

                {/* Image */}

                <div>
                    <img src={Basket}/>
                </div>

                {/* Right Values */}

                <div></div>

            </div>
        </div>
    </section>
  )
}

export default Values

const value = [
    {
        id: 1,
        title: 'Trust',
        para: 'It is a long established fact that a reader will be distracted by the readable.',
        icon: <FaHeart/>
    },
       {
        id: 2,
        title: 'Always Fresh',
        para: 'It is a long established fact that a reader will be distracted by the readable.',
        icon: <FaLeaf/>
    },
       {
        id: 3,
        title: 'Food Safety',
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        icon: <FaShieldAlt/>
    },
       {
        id: 4,
        title: '100% Organic',
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        icon: <FaSeedling/>
    }
]
