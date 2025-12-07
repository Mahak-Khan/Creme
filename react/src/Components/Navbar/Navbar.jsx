import React, { useEffect, useState } from 'react';
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { TbMenu2, TbMenu3, TbCameraSearch } from "react-icons/tb";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import clsx from 'clsx';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [animateWishlist, setAnimateWishlist] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const navigate = useNavigate();
  const toggleMenu = () => setShowMenu(!showMenu);

  // Wishlist Count
  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlist.length);
    setAnimateWishlist(true);
    setTimeout(() => setAnimateWishlist(false), 300);
  };

  useEffect(() => {
    updateWishlistCount();
    const sync = () => updateWishlistCount();
    window.addEventListener("wishlistUpdated", sync);
    return () => window.removeEventListener("wishlistUpdated", sync);
  }, []);

  // Cart Count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
  };

  useEffect(() => {
    updateCartCount();
    const sync = () => updateCartCount();
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, []);

  // Search Logic
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) return setSuggestions([]);
    const filtered = ProductList.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    navigate(`/search?query=${encodeURIComponent(name)}`);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white fixed top-0 right-0 left-0 z-50 ${isScrolled ? 'shadow-lg' : ''}`}>
      <nav className='max-w-[1400px] md:h-[14vh] mx-auto px-10 flex h-[12vh] justify-between items-center'>

        {/* Logo */}
        <Link to='/' className='text-3xl font-bold'>
          Cr<span className='text-rose-500'>乇</span>me
        </Link>

        {/* Desktop Menu */}
        <ul className='md:flex items-center gap-x-15 hidden'>
          <NavLink to="/" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>About</NavLink>
          <NavLink to="/Process" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>Process</NavLink>
          <NavLink to="/Contact" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>Contact Us</NavLink>
        </ul>

        {/* Search + Icons */}
        <div className='flex items-center gap-x-5 relative'>

          {/* Desktop Search */}
          <div className='md:flex p-1 border-2 border-rose-500 rounded-full hidden items-center gap-x-2'>
            {/* Camera Icon */}
            <button className='text-2xl text-rose-500 p-1 flex items-center justify-center'>
              <TbCameraSearch />
            </button>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder='Search...'
              autoComplete='off'
              className='flex-1 h-[7vh] px-3 focus:outline-none'
            />

            <button onClick={handleSearch} className='bg-linear-to-b from-rose-400 to-rose-500 text-white w-11 h-11 rounded-full flex justify-center items-center text-xl cursor-pointer'>
              <IoSearch />
            </button>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className='absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-64 max-h-60 overflow-auto z-50'>
                {suggestions.map(item => (
                  <li
                    key={item.id}
                    className='px-4 py-2 hover:bg-rose-100 cursor-pointer'
                    onClick={() => handleSuggestionClick(item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wishlist Icon */}
          <NavLink to="/Wishlist" className="relative text-zinc-800 text-2xl">
            <GoHeartFill className={clsx("transition-transform duration-300", animateWishlist && "scale-125")} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Cart Icon */}
          <NavLink to="/Cart" className="relative text-zinc-800 text-2xl">
            <HiShoppingBag className={clsx("transition-transform duration-300", animateCart && "scale-125")} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Hamburger */}
          <a href="#" onClick={toggleMenu} className='text-zinc-800 text-3xl md:hidden'>
            {showMenu ? <TbMenu3 /> : <TbMenu2 />}
          </a>
        </div>

        {/* Mobile Menu */}
        <ul className={`flex flex-col gap-y-12 bg-rose-500/15 backdrop-blur-xl shadow-xlrounded-xl p-10 items-center gap-x-15 md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>About</NavLink>
          <NavLink to="/Process" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>Process</NavLink>
          <NavLink to="/Contact" className={({ isActive }) => `font-semibold tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-800'} hover:text-rose-500`}>Contact Us</NavLink>

          {/* Mobile Camera + Search */}
          <div className='flex items-center gap-x-2 w-full'>
            <button className='text-2xl text-rose-500 p-1 flex items-center justify-center'>
              <TbCameraSearch />
            </button>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder='Search...'
              autoComplete='off'
              className='flex-1 h-[5vh] px-3 focus:outline-none rounded-full border border-rose-500'
            />
            <button onClick={handleSearch} className='bg-linear-to-b from-rose-400 to-rose-500 text-white w-10 h-10 rounded-full flex justify-center items-center text-xl'>
              <IoSearch />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
