'use client'
import Image from 'next/image';
import Cards from '@/components/Landing/Cards';
import React, { useState } from 'react';
import { AppButtons, ServiceButtons } from '@/components/Elements/Buttons/buttons';

function Rides(){
    return (
        <div className='p-12'>
        <div className='flex justify-center'>
            <div className="flex flex-col flex-1 ">
                <div className="p-8  md:px-0 text-lg md:text-justify text-white text-[19px]  leading-normal">
                    <p>With our riders distributed  everywhere,you can now request for a trip at a cheaper prices with convenience at best</p>
                    <p className='mt-4 font-semibold'>Available for Android and iOS devices</p>
                </div>
                <div className="text-white text-[24px] font-bold my-5 text-center lg:text-left">
                    <AppButtons text='Get the App' url='/' />
                </div>
            </div>
            <Image
                src='/assets/images/MovingBike.jpg'
                alt='bike image'
                width={600}
                height={450}
                className='md:pl-20 md:pr-10 opacity-60 hidden lg:block'
            />
        </div>
    </div>
    )
}
function Delivery() {
    return(
        <div className='p-12'>
        <div className='flex justify-center'>
            <div className="flex flex-col flex-1 ">
                <div className="p-8  md:px-0 text-lg md:text-justify text-white text-[19px]  leading-normal">
                    <p>SONGA works with riders to ensure customer goods
                        are delivered as well as being able to pick goods for
                        our customers and deliver them to their preferred
                        destination.</p>
                    <p className='mt-4 font-semibold'>Available for Android and iOS devices</p>
                </div>
                <div className="text-white text-[24px] font-bold my-5 text-center lg:text-left">
                    <AppButtons text='Get the App' url='/'/>
                </div>
            </div>
            <Image
                src='/assets/images/LoadedBike.jpg'
                alt='bike image'
                width={600}
                height={450}
                className='md:pl-20 md:pr-10 opacity-60 hidden lg:block'
            />
        </div>
    </div>
    )
}
const ServicesOffered = () => {
    const [isDeliveryButtonClicked, setIsDeliveryButtonClicked] = useState(false)
    
  const handleDeliveryButtonClick = () => {
    setIsDeliveryButtonClicked(true);
  };

  const handleRidesButtonClick = () => {
    setIsDeliveryButtonClicked(false);
  };
    return (
        <div className='py-2 '>
            <div className="lg:pt-[50px] sm:pt-[10px] text-black text-[30px] font-bold mb-4 text-center leading-[31.2px]">
                Our Services
            </div>
            <div className="flex justify-center align-center space-x-2 ">
                <ServiceButtons text = 'Rides'  onClick={handleRidesButtonClick} active={!isDeliveryButtonClicked} />
                <ServiceButtons text = 'Delivery' onClick={handleDeliveryButtonClick} active={isDeliveryButtonClicked} />
            </div>
            <div className='bg-green m-16 rounded-[24px] lg:flex lg:flex-col lg:flex-1'>
                {isDeliveryButtonClicked ? <Delivery /> : <Rides />}
            </div>
            
        </div>
    )
}

export default ServicesOffered;