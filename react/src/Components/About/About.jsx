import React from 'react'
import Heading from '../Heading/Heading'
import { Link } from 'react-router-dom'
import Chef from '../../Assets/Chef.jpg'

const About = () => {
  return (
    <div className='max-w-[1400px] min-h-screen mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center md:pt-25 pt-20 mb-10'>
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center'>
        <div className='w-fit mb-6 md:mb-10'>
          <Heading highlight="About" heading="Us" />
        </div>
        <div className='flex items-center justify-center'>
          <img
            src={Chef}
            alt="About Image"
            className='w-full max-w-[350px] md:max-w-full object-cover rounded-xl'
          />
        </div>
      </div>
      <div className='w-full md:w-1/2'>
        <div className='mt-8 bg-zinc-200 rounded-2xl p-5 md:p-7'>
          <p className='text-base md:text-xl font-medium leading-relaxed'>
            Welcome to
            <Link to='/' className='text-3xl font-bold ml-2'>
              Cr<span className='text-rose-500'>乇</span>me
            </Link>,
            where every bite tells a story. Born from a love for baking and a
            passion for sharing joy through delicious treats, we’ve been crafting
            fresh, handcrafted baked goods for 21 years.
            <br />
            At our bakery, we believe in the magic of quality ingredients,
            traditional techniques, and a sprinkle of creativity. From crusty
            breads and buttery pastries to decadent cakes and cookies, every item
            is made with care and attention to detail, ensuring a taste that
            delights every time.
            <br />
            But we’re more than just a bakery—we’re a part of the community.
            Whether it’s a special celebration, a comforting morning treat, or
            simply a moment to savor, we’re here to bring warmth and sweetness to
            your everyday life.
            <br />
            Join us in celebrating the simple joys of fresh-baked goodness. At
            <Link to='/' className='text-3xl font-bold ml-2'>
              Cr<span className='text-rose-500'>乇</span>me
            </Link>,
            it’s not just baking—it’s love, tradition, and a little bit of magic
            in every bite.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
