import React from 'react'
import Heading from '../Heading/Heading'
import FruitsCat from '../../Assets/cake-and-pastery.png'
import SeaFoodCat from '../../Assets/bread-and-buns.png'
import DairyCat from '../../Assets/cookie-and-biscuits.png'
import { Link } from 'react-router-dom'

const Category = () => {

    const renderCards = category.map(card => {
        return (

            // Card

            <div className='flex-1 basis-[300px]' key={card.id}>

                {/* Card Image */}

                <div className='w-full min-h-[30vh] relative -mb-10'>
                    <img src={card.image} className='w-full h-full object-contain absolute bottom-0' />
                </div>

                {/* Card Content */}

                <div className='bg-zinc-100 pt-17 p-8 rounded-xl'>
                    <h3 className='text-zinc-800 text-3xl font-bold'>{card.title}</h3>
                    <p className='text-zinc-600 mt-3 mb-9'>{card.description}</p>
                    <Link to={card.path} className='bg-gradient-to-b from-rose-400 to-rose-500 text-white px-8 py-3 rounded-lg md:text-lg text-md hover:scale-105 hover:to-rose-600 transition-all duration-300 cursor-pointer'>See All</Link>
                </div>
            </div>
        )
    })

    return (
        <section>
            <div className='max-w-[1400px] mx-autp px-10 py-20'>
                <Heading highlight="Shop" heading="by Category" />

                {/* Category Card */}
                <div className='flex flex-wrap gap-10 md:mt-15'>
                    {renderCards}
                </div>
            </div>
        </section>
    )
}

export default Category

const category = [
    {
        id: 1,
        title: 'Cakes & Pastries',
        description: 'Soft, sweet, and freshly baked delights. Explore a variety of cakes, cupcakes, and pastries to satisfy every craving.',
        image: FruitsCat,
        path: '/Cakes'
    },
    {
        id: 2,
        title: 'Cookies & Biscuits',
        description: 'Handcrafted cookies and buttery biscuits baked daily. Perfect for snacking or gifting to your loved ones.',
        image: DairyCat,
        path: '/Cookies'
    },
    {
        id: 3,
        title: 'Breads & Buns',
        description: 'Artisan breads, soft buns, and freshly baked rolls. Enjoy the comforting aroma of bakery-fresh goodness.',
        image: SeaFoodCat,
        path: '/Breads'
    }
]
