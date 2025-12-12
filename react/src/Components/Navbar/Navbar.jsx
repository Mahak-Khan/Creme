import React, { useEffect, useState, useRef } from 'react';
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { TbMenu2, TbMenu3, TbCameraSearch } from "react-icons/tb";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import clsx from 'clsx';
import { triggerCamera } from '../CameraAccess/CameraAccess';
import { extractTextFromBase64 } from "../visionOCR/visionOCR";
import Cropper from "react-easy-crop";
import Fuse from "fuse.js";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [animateWishlist, setAnimateWishlist] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showCropper, setShowCropper] = useState(false);
  const [rawImage, setRawImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const navigate = useNavigate();
  const cameraInputRef = useRef();

  const toggleMenu = () => setShowMenu(!showMenu);

  // Wishlist / Cart counts
  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlist.length);
    setAnimateWishlist(true);
    setTimeout(() => setAnimateWishlist(false), 300);
  };
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
  };

  useEffect(() => {
    updateWishlistCount();
    const sync = () => updateWishlistCount();
    window.addEventListener("wishlistUpdated", sync);
    return () => window.removeEventListener("wishlistUpdated", sync);
  }, []);

  useEffect(() => {
    updateCartCount();
    const sync = () => updateCartCount();
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, []);

  // FUSE.js (fuzzy search)
  const fuse = new Fuse(ProductList, {
    keys: ["name"],
    threshold: 0.5,
    minMatchCharLength: 2,
  });

  // ---------------- SEARCH BOX ----------------
  const handleSearch = (e) => {
    e?.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
      setSuggestions([]);
      setShowMenu(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) return setSuggestions([]);

    const results = fuse.search(value).map(r => r.item);
    setSuggestions(results.slice(0, 5));
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    navigate(`/search?query=${encodeURIComponent(name)}`);
    setSuggestions([]);
    setShowMenu(false);
  };

  // ---------------- SCROLL EFFECT ----------------
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------------- IMAGE + OCR ----------------
  const handleImageOCR = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setRawImage(url);
    setShowCropper(true);
    setQuery("");
  };

  const handleCropDone = async () => {
    if (!croppedAreaPixels || !rawImage) return;

    setShowCropper(false);
    setLoading(true);

    const img = new Image();
    img.src = rawImage;
    await new Promise(resolve => img.onload = resolve);

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const base64 = canvas.toDataURL("image/png");
    const rawText = await extractTextFromBase64(base64);

    let matchedText = rawText;

    // OCR fuzzy match → but ONLY use the extracted text in search page heading
    const results = fuse.search(rawText);
    if (results.length > 0) {
      matchedText = results[0].item.name;
    }

    setLoading(false);

    if (matchedText.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(rawText)}`);
      setQuery("");
    }
  };

  return (
    <header className={`bg-white fixed top-0 right-0 left-0 z-50 ${isScrolled ? 'shadow-lg' : ''}`}>

      {/* Cropper Modal */}
      {showCropper && rawImage && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 shadow-xl relative">
            <div className="w-[90vw] max-w-[350px] h-[350px] relative">
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                rotation={rotation}   // ✅ Rotation applied
                aspect={4 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(area, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>

            {/* Rotation Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setRotation((prev) => prev - 90)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Rotate Left
              </button>
              <button
                onClick={() => setRotation((prev) => prev + 90)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Rotate Right
              </button>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowCropper(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCropDone}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}


      <nav className='max-w-[1400px] md:h-[14vh] mx-auto px-10 flex h-[12vh] justify-between items-center'>

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

        {/* Right Section */}
        <div className='flex items-center gap-x-5 relative'>

          {/* Desktop Search */}
          <div className='md:flex p-1 border-2 border-rose-500 rounded-full hidden items-center gap-x-2 relative'>
            <button
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                triggerCamera(cameraInputRef, handleImageOCR);
              }}
              className='text-2xl text-rose-500 cursor-pointer p-1'
            >
              <TbCameraSearch />
            </button>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder='Search...'
              className='flex-1 h-[7vh] px-3 focus:outline-none'
              autoComplete='off'
            />

            <button onClick={handleSearch} className='bg-gradient-to-b from-rose-400 to-rose-500 text-white w-11 h-11 rounded-full flex justify-center items-center text-xl cursor-pointer'>
              <IoSearch />
            </button>

            {suggestions.length > 0 && (
              <ul className='absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-64 max-h-60 overflow-auto z-50'>
                {suggestions.map(item => (
                  <li
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.name)}
                    className='px-4 py-2 hover:bg-rose-100 cursor-pointer'
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wishlist */}
          <NavLink to="/Wishlist" className="relative text-zinc-800 text-2xl">
            <GoHeartFill className={clsx("transition-transform duration-300", animateWishlist && "scale-125")} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink to="/Cart" className="relative text-zinc-800 text-2xl">
            <HiShoppingBag className={clsx("transition-transform duration-300", animateCart && "scale-125")} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </NavLink>

          <a href="#" onClick={toggleMenu} className='text-zinc-800 text-3xl md:hidden'>
            {showMenu ? <TbMenu3 /> : <TbMenu2 />}
          </a>
        </div>

        {/* Mobile Menu */}
        <ul className={`flex flex-col gap-y-12 bg-rose-500/15 backdrop-blur-xl shadow-xl rounded-xl p-10 items-center md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2' : ''}`}>
          <NavLink to="/" onClick={() => setShowMenu(false)} className="font-semibold">Home</NavLink>
          <NavLink to="/About" onClick={() => setShowMenu(false)} className="font-semibold">About</NavLink>
          <NavLink to="/Process" onClick={() => setShowMenu(false)} className="font-semibold">Process</NavLink>
          <NavLink to="/Contact" onClick={() => setShowMenu(false)} className="font-semibold">Contact Us</NavLink>

          <li className='flex p-1 border-2 border-rose-500 rounded-full relative w-full'>
            <button
              onClick={() => {
                setShowMenu(false);
                triggerCamera(cameraInputRef, handleImageOCR);
              }}
              className='text-2xl text-rose-500 p-1'
            >
              <TbCameraSearch />
            </button>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder='Search...'
              className='flex-1 h-[5vh] px-3 focus:outline-none rounded-full'
              autoComplete='off'
            />

            <button
              onClick={(e) => {
                setShowMenu(false);
                handleSearch(e);
              }}
              className='bg-gradient-to-b from-rose-400 to-rose-500 text-white w-10 h-10 rounded-full flex justify-center items-center text-xl'
            >
              <IoSearch />
            </button>
          </li>
        </ul>

        {/* Hidden Camera Input */}
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: "none" }} />

        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-xl flex flex-col items-center gap-2 shadow-lg">
              <p className="text-gray-800 font-medium text-center">Processing image...</p>
              <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default Navbar;
