"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sans_hebrew } from "@/app/ui/fonts";
import { HeroButtons } from "@/components/Elements/Buttons/buttons";
import WaitlistPopup from "@/components/Elements/Waitlist";
import { Fade } from "react-awesome-reveal";


export const Hero = () => {
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);

  const handleGetStarted = () => {
    setShowWaitlistPopup(true);
  };

  const handleClose = () => {
    setShowWaitlistPopup(false);
  };

  return (
    <div className="h-screen w-full">
      {/* mobile view background */}
      {/* <div className="">
        <div className="w-full h-[80vh] relative md:hidden ">
          <Image
            src="/assets/images/hero-bg-new.jpg"
            alt="boba boda riders"
            sizes="80vh"
            fill
            className="object-cover"
          />
        </div>
      </div> */}
      <div className="w-full h-full md:flex md:flex-row md:items-start bg-[#f1f3f5]">
        {/* Left Side */}
        <div className="w-full pt-20 md:w-1/2 md:flex flex-col md:justify-center md:items-center  ">
        <div className=" w-full">
          <div className="text-white text-center md:text-left px-6 md:px-16 space-y-20 md:space-y-12 ">
            <Fade direction="down" triggerOnce={true}>
              <div>
                <p
                  className={`${sans_hebrew.className} tracking-normal text-[#0F9434] font-extrabold text-2xl md:text-4xl md:leading-2 md:tracking-[.25em]`}
                >
                  A DIGITAL <br/><br/>  RIDER <br /><br/>  EXPERIENCE.
                </p>
              </div>
            </Fade>

            <div className="md:space-y-8">
              <Fade><HeroButtons text="JOIN THE WAITLIST" url="/"  onClick={handleGetStarted}/></Fade>
              <Fade direction="up" triggerOnce={true}>
                <div className="w-full flex flex-col items-center md:flex-row md:justify-start md:items-start md:space-x-8">
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
              </Fade>
            </div>
          </div>
        </div>
      </div>

          {/* Right Side */}
          
          <div className="hidden md:relative md:flex justify-center">
            {/* <Fade direction="right" triggerOnce={true}> */}
            <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src="/assets/images/hero-bg.jpg"
                  alt="boda boda riders"
                  width={840}
                  height={840}
                  className="rounded-md"
                />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/assets/icons/songa-white-logo.png"
                  alt="SONGA"
                  width={400}
                  height={400}
                  className="rounded-full"
                />
              </div>
            </div>
          {/* </Fade> */}
          </div>

          {/* mobile view */}
          {showWaitlistPopup && <WaitlistPopup onClose={handleClose} />}
      </div>
    </div>
  );
};
