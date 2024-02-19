/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { HeroButtons } from '@/components/Elements/Buttons/buttons';

const AboutUs: React.FC = () => {
  return (
    <div id="about" className='w-auto h-auto bg-white md:flex'>
      <div className='pt-9 flex flex-col flex-1 items-center mx-12 md:w-1/2 md:items-start md:px-12'>
        <div className="lg:w-[362px] h-[89px] text-black text-3xl font-bold">
          About Us
        </div>
        {/* <div className="w-[165px] h-[18px] mb-4 mt-2 relative">
          <Image
            src='/assets/images/miniflag.png'
            alt='Kenyan miniflag'
            fill={true}
          />
        </div> */}
        <div className="text-center mt-1 px-8 md:px-0 text-lg md:text-justify text-black text-[14px] font-semibold leading-normal">With a clear understanding of how boda works , SONGA aims
          to digitize boda  stakeholders experience by making their
          engagement and processes digital.</div>
        <div className='my-4'>
          <HeroButtons text='GET STARTED' url='/' />
        </div>
        <div className='mt-20 flex items-center justify-center'>
          <Image
            src='/assets/images/bike.png'
            alt='bike image'
            width={420}
            height={540}
            className='md:pl-20'
          />
        </div>
        {/* <div className='flex flex-col gap-y-4 md:w-full md:flex-row md:justify-between md:items-center mt-8'>
          <div className="w-[117px] h-[125.93px] relative">
            <div className="w-[117px] h-[69px] left-0 top-0 absolute"><span className="text-green-600 text-[40px] font-extrabold leading-10">+</span><span className="text-green-600 text-[70px] font-extrabold leading-10">1</span><span className="text-green-600 text-[32px] font-normal leading-5">K</span></div>
            <div className="w-[110.04px] h-[17.93px] left-[38px] top-[78px] md:top-[108px] absolute text-green-600 text-[20px] font-semibold leading-relaxed">RIDERS</div>
          </div>

          <div className="w-[142px] h-[125.93px] relative">
            <div className="w-[142px] h-[69px] left-0 top-0 absolute"><span className="text-green-600 text-[40px] font-extrabold leading-10">+</span><span className="text-green-600 text-[70px] font-extrabold leading-10">10</span><span className="text-green-600 text-[32px] font-normal leading-5">K</span></div>
            <div className="w-[66.44px] h-[17.93px] left-[38px] top-[78px] md:top-[108px] absolute text-green-600 text-[20px] font-semibold leading-relaxed">TRIPS</div>
          </div>

          <div className="w-[147px] h-[125.93px] relative">
            <div className="w-[147px] h-[69px] left-0 top-0 absolute"><span className="text-green-600 text-[70px] font-extrabold leading-10">24</span><span className="text-green-600 text-[32px] font-normal leading-10">Hrs</span></div>
            <div className="w-[96.88px] h-[17.93px] left-[25px] top-[78px] md:top-[108px] absolute text-green-600 text-[20px] font-semibold leading-relaxed">SERVICE</div>
          </div>
        </div> */}
      </div>
      <div className='pt-9 flex flex-col flex-1 items-center mx-12 md:w-1/2 md:items-start md:px-12'>
        <div className='flex items-center justify-center'>
          <Image
            src='/assets/images/bike.png'
            alt='bike image'
            width={420}
            height={540}
            className='md:pl-20'
          />
        </div>
        <div className="lg:w-[362px] h-[89px] text-black text-3xl font-bold">
          Who We Are
        </div>
        <div className="text-center mt-1 px-8 md:px-0 text-lg md:text-justify text-black text-[14px] font-semibold leading-normal">We are an ERP solution provider who’ve tailored our  app
          to solve bodaboda problems.
          We incorporate 21C tech to transform how we consume bodaboda.</div>
      </div>
    </div>
  );
};

export default AboutUs;
