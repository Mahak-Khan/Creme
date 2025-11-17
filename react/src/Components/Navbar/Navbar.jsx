import React, { useEffect } from 'react'
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { useState } from 'react';
import { TbMenu3 } from "react-icons/tb";
// import About from '../About/About';
// import Contact from '../Contact/Contact';
// import Process from '../Process/Process'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    return (
        <header className={`bg-white fixed top-0 right-0 left-0 z-50 ${isScrolled ? 'shadow-lg' : ""}`}>
            <nav className='max-w-[1400px] md:h-[14vh] mx-auto px-10 flex h-[12vh] justify-between items-center'>

                {/* LOGO */}

                <Link to='/' className='text-3xl font-bold'>
                    Cr<span className='text-rose-500'>乇</span>me
                </Link>

                {/* Desktop Menu */}
                <ul className='md:flex items-center gap-x-15 hidden'>
                    <NavLink to="/" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        Home
                    </NavLink>

                    <NavLink to="/About" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        About
                    </NavLink>

                    <NavLink to="/Process" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        Process
                    </NavLink>

                    <NavLink to="/Contact" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        Contact Us
                    </NavLink>

                </ul>

                {/* Search, wishlist, cart */}

                <div className='flex items-center gap-x-5'>
                    <div className='md:flex p-1 border-2 border-rose-500 rounded-full hidden'>
                        <input type="text" name="text" id="text" placeholder='Search...' autoComplete='off' className='flex-1 h-[7vh] px-3 focus:outline-none' />
                        <button className='bg-linear-to-b from-rose-400 to-rose-500 text-white w-11 h-11 rounded-full flex justify-center items-center text-xl cursor-pointer'><IoSearch /></button>
                    </div>
                    <a href='#' className='text-zinc-800 text-2xl'>
                        <GoHeartFill />
                    </a>
                    <a href='#' className='text-zinc-800 text-2xl'>
                        <HiShoppingBag />
                    </a>

                    {/*HamBurger */}

                    <a href="#" onClick={toggleMenu} className='text-zinc-800 text-3xl md:hidden'>
                        {showMenu ? <TbMenu3 /> : <TbMenu2 />}
                    </a>
                </div>

                {/*Mobile Menu */}

                <ul className={`flex flex-col gap-y-12 bg-rose-500/15 backdrop-blur-xl shadow-xlrounded-xl p-10 items-center gap-x-15 md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2' : ""}`}>
                   <NavLink to="/" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        Home
                    </NavLink>

                    <NavLink to="/About" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        About
                    </NavLink>

                    <NavLink to="/Process" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        Process
                    </NavLink>

                    <NavLink to="/Contact" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>
                        Contact Us
                    </NavLink>
                    <li className='flex p-1 border-2 border-rose-500 rounded-full md:hidden'>
                        <input type="text" name="text" id="text" placeholder='Search...' autoComplete='off' className='flex-1 h-[5vh] px-3 focus:outline-none' />
                        <button className='bg-linear-to-b from-rose-400 to-rose-500 text-white w-10 h-10 rounded-full flex justify-center items-center text-xl'><IoSearch /></button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
