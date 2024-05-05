import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='relative bg-[#f1f3f5] md:h-[70vh] w-full p-5 text-black '>
      <div className='flex flex-col space-y-4 md:space-y-0 justify-center items-center md:justify-between md:items-center md:flex-row md:pt-20 md:px-12 '>
        {/* COMPANY */}
        <div className='space-y-2 md:space-y-4'>
          <h2 className='text-md text-center md:text-start md:text-lg font-extrabold '>Company</h2>
          <div className='flex space-x-6 md:space-x-0  md:flex-col md:space-y-4 text-[#009245] text-md font-bold'>
            <Link href='#'>Life at SONGA</Link>
            <Link href='#'>Our Products</Link>
            <Link href='#'>Careers</Link>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className='space-y-2 md:space-y-4'>
          <h2 className='text-md text-center md:text-start md:text-lg font-extrabold '>AI Rider</h2>
          <div className='flex space-x-6 md:space-x-0 md:flex-col md:space-y-4 text-[#009245] text-md font-bold'>
            <Link href='#'>Our Products</Link>
            <Link href='#'>Partnerships</Link>
            <Link href='#'>Terms & Conditions</Link>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        {/* <div className='space-y-2 md:space-y-4 mt-0'>
          <h2 className='text-lg font-extrabold '>Socials</h2>
          <div className='flex flex-row space-x-2 text-[#009245] text-md font-bold'>
            <Link href="/">
                <Image className="h-[20px]"  src="/assets/icons/social-media/facebook.svg" width={20} height={20} alt={'Facebook'} />
            </Link>
            <Link href="/">
                <div>
                  <Image src="/assets/icons/social-media/twitter.svg" width={20} height={20} alt={'Facebook'} />
                </div>
              </Link>
              <Link href="/">
                <div>
                  <Image src="/assets/icons/social-media/insta.svg" width={20} height={20} alt={'Facebook'} />
                </div>
              </Link>
          </div>
        </div> */}

        {/* CONTACT US */}
        <div className='space-y-2 md:space-y-4'>
          <h2 className='text-md text-center md:text-start md:text-lg font-extrabold '>Contact Us</h2>
          <div className='flex flex-col space-y-4 text-[#009245] text-md font-bold'>
            <Link href='#'>Gateway Park, Mombasa Road, <br/> Nairobi Kenya.</Link>
            <Link href='#'>+254 57828592</Link>
            <Link href='#'>info@songabiz.app</Link>
          </div>
        </div>
      </div>
      <div className='mt-16 border-t-[.5px] border-gray-500/30'>
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <div>
            <Image src="/assets/icons/logo.svg" alt='logo' width={100} height={100} />
          </div>
          <div><p className='text-black/80 font-bold'>&copy; {new Date().getFullYear()} All rights Reserved</p></div>
        </div>
    </div>
  </div>
  )
}
