import React, { useEffect } from 'react'
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { useState } from 'react';
import { TbMenu3 } from "react-icons/tb";

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () =>{
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return ()=> window.removeEventListener('scroll', handleScroll)

    }, [])

  return (
    <header className={`bg-white fixed top-0 right-0 left-0 z-50 ${isScrolled ? 'shadow-lg' : ""}`}>
        <nav className='max-w-[1400px] md:h-[14vh] mx-auto px-10 flex h-[12vh] justify-between items-center'>
            
            {/* LOGO */ }

            <a href='#' className='text-3xl font-bold'>
                Gr<span className='text-orange-500'>O</span>cify
            </a>

            {/* Desktop Menu */ }

            <ul className='md:flex items-center gap-x-15 hidden'>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-orange-500'>Home</a>
                </li>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-zinc-800 hover:text-orange-500'>About Us</a>
                </li>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-zinc-800 hover:text-orange-500'>Process</a>
                </li>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-zinc-800 hover:text-orange-500'>Contact Us</a>
                </li>
            </ul>

            {/* Search, wishlist, cart */ }

            <div className='flex items-center gap-x-5'>
                <div className='md:flex p-1 border-2 border-orange-500 rounded-full hidden'>
                    <input type="text" name="text" id="text" placeholder='Search...' autoComplete='off' className='flex-1 h-[7vh] px-3 focus:outline-none'/>
                    <button className='bg-linear-to-b from-orange-400 to-orange-500 text-white w-11 h-11 rounded-full flex justify-center items-center text-xl'><IoSearch /></button>
                </div>
                <a href='#' className='text-zinc-800 text-2xl'>
                    <GoHeartFill />
                </a>
                <a href='#' className='text-zinc-800 text-2xl'>
                    <HiShoppingBag />
                </a>

            {/*HamBurger */}

                <a href="#" onClick={toggleMenu} className='text-zinc-800 text-3xl md:hidden'>
                    {showMenu ? <TbMenu3 /> : <TbMenu2/>}
                </a>
            </div>

            {/*Mobile Menu */}

               <ul className={`flex flex-col gap-y-12 bg-orange-500/15 backdrop-blur-xl shadow-xlrounded-xl p-10 items-center gap-x-15 md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2':""}`}>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-orange-500'>Home</a>
                </li>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-zinc-800 hover:text-orange-500'>About Us</a>
                </li>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-zinc-800 hover:text-orange-500'>Process</a>
                </li>
                <li>
                    <a href='#' className='font-semibold tracking-wider text-zinc-800 hover:text-orange-500'>Contact Us</a>
                </li>
                <li className='flex p-1 border-2 border-orange-500 rounded-full md:hidden'>
                    <input type="text" name="text" id="text" placeholder='Search...' autoComplete='off' className='flex-1 h-[5vh] px-3 focus:outline-none'/>
                    <button className='bg-linear-to-b from-orange-400 to-orange-500 text-white w-10 h-10 rounded-full flex justify-center items-center text-xl'><IoSearch /></button>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
