import React from 'react'
import Heading from '../Heading/Heading'
import Button from '../Button/Button'
import { IoLocationSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { MdFax } from "react-icons/md";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
  return (
    <div className='max-w-[1400px] min-h-screen mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center md:pt-25 pt-20 mb-10 bg-zinc-800 gap-2'>

      {/* Left Side */}
      <div className='w-1/2 p-20 mt-5'>
        <div className='flex gap-5'>
          <div className='bg-white w-1/2 h-60'>
            <h1 className='text-rose-200 mt-5 items-center justify-center flex'><IoLocationSharp size={75} /></h1>
            <h1 className='font-bold text-xl items-center justify-center flex'>Our Main Office</h1>
            <p className='text-zinc-900 font-sm items-center justify-center flex mt-3'>SoHo 94 Broadway St</p>
            <p className='text-zinc-900 font-sm items-center justify-center flex'>New York, NY 1001</p>
          </div>
          <div className='bg-white w-1/2'>
            <h1 className='text-rose-200 mt-5 items-center justify-center flex'><IoCallSharp size={75}/></h1>
            <h1 className='font-bold text-xl items-center justify-center flex'>Phone Number</h1>
            <p className='text-zinc-900 font-sm items-center justify-center flex mt-3'>234-9876-5400</p>
            <p className='text-zinc-900 font-sm items-center justify-center flex'>888-0123-4567 (Toll Free)</p>
          </div>
        </div>
        <div className='flex gap-5 mt-5'>
          <div className='bg-white w-1/2 h-50'>
            <h1 className='text-rose-200 mt-5 items-center justify-center flex'><MdFax size={75}/></h1>
            <h1 className='font-bold text-xl items-center justify-center flex'>Fax</h1>
            <p className='text-zinc-900 font-sm items-center justify-center flex mt-3'>1-234-567-8900</p>
          </div>
          <div className='bg-white w-1/2'>
            <h1 className='text-rose-200 mt-5 items-center justify-center flex'><IoIosMail size={75}/></h1>
            <h1 className='font-bold text-xl items-center justify-center flex'>Email</h1>
            <p className='text-zinc-900 font-sm items-center justify-center flex mt-3'>help@me.out</p>
          </div>
        </div>


      </div>

      {/* Right Side */}
      <div className='w-1/2 bg-rose-200 p-20 mt-5'>
        <form className='pl-20'>
          <Heading highlight="Contact" heading="Us" className="mt-4" />
          <input type="text" placeholder='Enter Your Name' className='flex w-[95%] p-2 mt-4 bg-white text-zinc-900' />
          <input type="email" placeholder='Enter a valid email address' className='flex w-[95%] p-2 mt-4  bg-white text-zinc-900' />
          <textarea className='flex w-[95%] p-2 mt-4 mb-4 h-25 bg-white text-zinc-900' />
          <div className='ml-34'>
            <Button content="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
