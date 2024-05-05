"use client";
import Image from "next/image";
import Cards from "@/components/Landing/Cards";
import React, { useState } from "react";
import {
  AppButtons,
  ServiceButtons,
} from "@/components/Elements/Buttons/buttons";

function Rides() {
  return (
    <div className="p-4 md:p-12">
      <h1 className="text-center text-[#FFFFFF] font-extrabold text-lg md:text-xl mb-4">DIGITAL RIDER EXPERIENCE</h1>
      <div className="flex justify-center mt-2">
        <div className="flex flex-col flex-1 ">
          <div className="text-lg md:text-justify text-white text-[19px]  leading-normal">
            <p>
            The market is evolving and passengers are getting more digital with new technologies. 
            SONGA Smart App is a rider on  your phone, and uses technology to pair you with a rider closest to you.
            </p>
            <p className="mt-4 font-semibold">
              Available for Android and iOS devices
            </p>
          </div>
          <div className="text-white text-[24px] font-bold my-5 text-center lg:text-left">
            <AppButtons text="Get the App" url="/" />
          </div>
        </div>
        <Image
          src="/assets/images/MovingBike.jpg"
          alt="bike image"
          width={600}
          height={450}
          className="md:pl-20 md:pr-10 opacity-60 hidden lg:block"
        />
      </div>
    </div>
  );
}
function Delivery() {
  return (
    <div className="p-4 md:p-12">
      <h1 className="text-center text-[#FFFFFF] font-extrabold text-lg md:text-xl mb-4">TRANSFORMATION</h1>
      <div className="flex justify-center">
        <div className="flex flex-col flex-1 ">
          <div className="px-0 text-lg md:text-justify text-white md:text-[19px]  md:leading-normal">
            <p>
              Our technology is stemmed by the challenges currently existing in the boda
              industry.Our goal is to change the way we use boda
              by introducing technology to the rider
              who actually provide the services.
            </p>
          </div>
          <div className="text-white text-[24px] font-bold my-5 text-center lg:text-left">
            <AppButtons text="Learn More" url="/" />
          </div>
        </div>
        <Image
          src="/assets/images/LoadedBike.jpg"
          alt="bike image"
          width={600}
          height={450}
          className="md:pl-20 md:pr-10 opacity-60 hidden lg:block"
        />
      </div>
    </div>
  );
}
const ServicesOffered = () => {
  const [isDeliveryButtonClicked, setIsDeliveryButtonClicked] = useState(false);

  const handleDeliveryButtonClick = () => {
    setIsDeliveryButtonClicked(true);
  };

  const handleRidesButtonClick = () => {
    setIsDeliveryButtonClicked(false);
  };
  return (
    <div className="py-2 pt-32 md:pt-4 bg-white">
      <div className="lg:pt-[50px] sm:pt-[10px] text-black text-[30px] font-bold mb-4 text-center leading-[31.2px]">
        Our Services
      </div>
      <div className="flex justify-center align-center space-x-2 ">
        <ServiceButtons
          text="Rides"
          onClick={handleRidesButtonClick}
          active={!isDeliveryButtonClicked}
        />
        <ServiceButtons
          text="Delivery"
          onClick={handleDeliveryButtonClick}
          active={isDeliveryButtonClicked}
        />
      </div>
      <div className="bg-green w-auto m-4 md:m-16 rounded-[24px] lg:flex lg:flex-col lg:flex-1">
        {isDeliveryButtonClicked ? <Delivery /> : <Rides />}
      </div>
    </div>
  );
};

export default ServicesOffered;
