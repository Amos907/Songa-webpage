"use client";
import Image from "next/image";
import Link from "next/link";
import { sans_hebrew } from "@/app/ui/fonts";
import { HeroButtons } from "@/components/Elements/Buttons/buttons";

export const Hero = () => {
  return (
    <div className="h-screen w-full">
      <div className="w-full md:flex md:flex-row md:items-start">
        {/* Left Side */}
        <div className="w-1/2 h-full pt-20  md:flex flex-col md:justify-center md:items-center  ">
        <div className=" w-full">
          <div className="text-white px-6 md:px-16 space-y-20 md:space-y-16 ">
            <div>
              <p
                className={`${sans_hebrew.className} tracking-normal text-[#000000] font-extrabold text-2xl md:text-4xl md:leading-2 md:tracking-[.25em]`}
              >
                A DIGITAL <br/> <br /> RIDER <br /> <br /> EXPERIENCE.
              </p>
            </div>
            <div className="md:space-y-8">
              <HeroButtons text="GET STARTED" url="/" />
              <div className="w-full flex md:space-x-8">
                <div>
                  <Link href="/">
                    <Image
                      src="/assets/icons/app-store.png"
                      alt="Download on Apple Store"
                      width={150}
                      height={150}
                    />
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <Image
                      src="/assets/icons/play-store.png"
                      alt="Download on Apple Store"
                      width={180}
                      height={180}
                      className="pt-3"
                    />
                  </Link>
                  </div>
              </div>
            </div>
            
          </div>

          {/* <div className="h-72 md:h-full flex justify-between items-center mb-8">
            <figure className="h-12 w-12 relative">
              <Image
                src="/assets/icons/arrow-left.svg"
                alt="Songa Logo"
                sizes="100vh"
                fill
                priority
              />
            </figure>

            <figure className="h-12 w-12 relative">
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Songa Logo"
                sizes="100vh"
                fill
                priority
              />
            </figure>
          </div> */}
        </div>
      </div>

          {/* Right Side */}
          
          <div className="hidden md:relative md:flex justify-center">
            <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src="/assets/images/hero-bg.jpg"
                  alt="boda boda riders"
                  width={840}
                  height={840}
                  className="rounded-md"
                />
              <div className="absolute inset-0 bg-[#f1f3f5] bg-opacity-50 rounded-md"></div>
            </div>
          </div>
      </div>

      
    </div>
  );
};
