"use client";
import Image from "next/image";
import Link from "next/link";
import { sans_hebrew } from "@/app/ui/fonts";
import { HeroButtons } from "@/components/Elements/Buttons/buttons";

export const Hero = () => {
  return (
    <div className="relative h-[100vh] w-screen">
      <div className="w-full ">
        <Image
          src="/assets/images/hero-bg-new.jpg"
          alt="boba boda riders"
          sizes="100vh"
          fill
          className="object-cover md:object-fill"
        />
      </div>

      <div className="w-full h-full pt-20 md:pt-2 md:mt-0 md:flex flex-col justify-center bg-[#f1f3f5] bg-opacity-50 absolute z-0">
        <div className="md:grid grid-cols-2 w-full">
          <div className="text-white px-4 md:px-16 space-y-20 md:space-y-20">
            <div>
              <p
                className={`${sans_hebrew.className} tracking-normal text-[#000000] font-extrabold text-2xl md:text-3xl md:leading-2 md:tracking-[.25em]`}
              >
                Use SONGA, <br /> to get served by a technology enabled rider
              </p>
            </div>
            <div>
              <div className="">
                <HeroButtons text="GET STARTED" url="/" />
              </div>
              <div className="flex md:space-x-8">
                <Link href="/">
                  <Image
                    src="/assets/icons/app-store.png"
                    alt="Download on Apple Store"
                    width={150}
                    height={150}
                  />
                </Link>
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
    </div>
  );
};
