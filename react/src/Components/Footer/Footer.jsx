import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-100 py-20">
        <div className='max-w-[1400px] mx-auto px-10'>
            <div>
                <a href='#' className='text-3xl font-bold'>
                Cr<span className='text-rose-500'>乇</span>me
                </a>
                <p className='text-zinc-600 mt-6 max-w-[350px]'>
                    Freshly baked cakes, pastries, and treats made with love. Delight in every bite from our bakery to your home.
                </p>
                <p className='text-zinc-800 mt-6'>
                  2025 &copy; All Rights Reserved.
                </p>
            </div>
            <ul>
                <li>
                  <h5 className='text-zinc-800 text-2xl'>Company</h5>
                </li>
                <li className='mt-6'>
                  <a href='#' className='text-zinc-800 hover:text-rose-500'>About</a>
                </li>
                <li className='mt-6'>
                  <a href='#' className='text-zinc-800 hover:text-rose-500'>FAQ's</a>
                </li>         
            </ul>
        </div>      
    </footer>
  )
}

export default Footer
