import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Button from '../Button/Button';

const Cards = ({ id, image, name, price, onWishlistChange, onCartChange, isCartPage = false }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => quantity > 1 && setQuantity(prev => prev - 1);

  const normalizeId = value => String(value);

  // ----------------- WISHLIST -----------------
  const getWishlist = () => JSON.parse(localStorage.getItem("wishlist")) || [];

  const checkWishlistStatus = () => {
    const wishlist = getWishlist();
    setInWishlist(wishlist.some(item => normalizeId(item.id) === normalizeId(id)));
  };

  const toggleWishlist = () => {
    let wishlist = getWishlist();

    if (inWishlist) {
      wishlist = wishlist.filter(item => normalizeId(item.id) !== normalizeId(id));
    } else {
      if (!wishlist.some(item => normalizeId(item.id) === normalizeId(id))) {
        wishlist = [...wishlist, { id, image, name, price }];
      }
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    checkWishlistStatus();
    if (onWishlistChange) onWishlistChange();
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  useEffect(() => {
    checkWishlistStatus();
    const sync = () => checkWishlistStatus();
    window.addEventListener("wishlistUpdated", sync);
    return () => window.removeEventListener("wishlistUpdated", sync);
  }, [id]);


  // ----------------- CART -----------------
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

  const checkCartStatus = () => {
    const cart = getCart();
    setInCart(cart.some(item => normalizeId(item.id) === normalizeId(id)));
  };

  const toggleCart = () => {
    let cart = getCart();

    if (inCart) {
      cart = cart.filter(item => normalizeId(item.id) !== normalizeId(id));
    } else {
      if (!cart.some(item => normalizeId(item.id) === normalizeId(id))) {
        cart = [...cart, { id, image, name, price, quantity }];
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    checkCartStatus();
    if (onCartChange) onCartChange();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    checkCartStatus();
    const sync = () => checkCartStatus();
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, [id]);


  // ----------------- UI -----------------
  return (
    <div className='bg-zinc-100 p-5 rounded-xl'>
      
      {/* TOP BUTTONS */}
      <div className='flex justify-between'>
        
        {/* Wishlist Heart */}
        <span
          className={`text-3xl cursor-pointer ${inWishlist ? "text-rose-500" : "text-zinc-300"}`}
          onClick={toggleWishlist}
        >
          <FaHeart />
        </span>

        {/* Add / Remove Cart */}
        <button
          className='bg-gradient-to-b from-rose-400 to-rose-500 text-white text-xl px-3 py-2 rounded-lg cursor-pointer flex justify-center items-center hover:scale-105 hover:to-rose-600 transition-all duration-300'
          onClick={toggleCart}
        >
          {isCartPage ? (
            <span className="text-white text-xl">✖</span>
          ) : (
            <p className={`${inCart ? "text-zinc-300" : "text-white"} text-xl`}>
              {inCart ? "Added !" : "Add to Cart"}
            </p>
          )}
        </button>

      </div>

      {/* IMAGE */}
      <div className='w-full h-50'>
        <img src={image} alt={name} className='w-full h-full mx-auto object-contain' />
      </div>

      {/* BOTTOM CONTENT */}
      <div className='text-center space-y-4'>
        <h3 className='text-2xl font-semibold'>{name}</h3>
        <p className='text-2xl font-bold mt-4 mb-3'>₹{price}</p>

        {/* ---------- QTY ONLY ON CART | SHOP NOW/BUT ALWAYS ---------- */}
        <div className="flex items-center justify-center gap-4">

          {/* Quantity selector only appears on cart page */}
          {isCartPage && (
            <div className="flex items-center bg-gradient-to-b from-rose-400 to-rose-500 rounded-lg overflow-hidden">

              <button
                className="text-white px-3 cursor-pointer py-2 text-lg hover:scale-105 transition-all"
                onClick={decreaseQty}
              >
                -
              </button>

              <div className="bg-white text-rose-500 px-4 py-2 text-lg font-semibold">
                {quantity}
              </div>

              <button
                className="text-white px-3 cursor-pointer rounded-full py-2 text-lg hover:scale-105 transition-all"
                onClick={increaseQty}
              >
                +
              </button>

            </div>
          )}

          {/* Shop Now everywhere — Buy in cart page */}
          <Button
            content={isCartPage ? "Buy" : "Shop Now"}
            className="px-6 py-2 text-md"
          />

        </div>

      </div>
    </div>
  );
};

export default Cards;
