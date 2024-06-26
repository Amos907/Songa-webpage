"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { sans_hebrew } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Fade } from "react-awesome-reveal";

const navLinks = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About Us",
    url: "/about-us",
  },
  {
    id: 3,
    title: "Services",
    url: "/services",
  },
];
export const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const pathname = usePathname();
  return (
    <div className="sticky bg-white top-0 w-full z-10 px-2 py-2 md:px-8 md:py-0 ">
      <div>
        <div className="flex items-center justify-between">
          <div className="">
            <figure className="h-16 w-20 md:h-24 md:w-28 md:ml-6 relative">
              <Link href="/">
                <Image
                  src="/assets/icons/SONGA-red-logo.png"
                  alt="Songa Logo"
                  sizes="100vh"
                  fill
                  priority
                />
              </Link>
            </figure>
          </div>

          <Fade direction="left" cascade damping={0.1} triggerOnce={false}>
            <div className="hidden md:flex mt-4">
              <div className="md:px-2 md:text-sm lg:px-4 lg:text-lg flex mx-auto">
                {navLinks.map((navLink) => (
                  <Link
                    key={navLink.id}
                    href={navLink.url}
                    className={clsx(
                      "mx-2 lg:mx-12 text-[14px] text-[#020202] font-bold leading-normal py-1",
                      {
                        "border-b-4  border-[#A90000]": pathname === navLink.url,
                      }
                    )}
                  >
                    <p className="text-xl font-bold uppercase">{navLink.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Fade>
          {/* Mobile version */}
          <div
            className="md:hidden flex items-center justify-center space-x-3 mr-4"
            onClick={handleClick}
          >
            {!nav ? (
              <AiOutlineMenu className="w-6 h-6 cursor-pointer font-bold text-black" />
            ) : (
              <AiOutlineClose className="w-6 h-6 cursor-pointer font-bold text-black" />
            )}
          </div>
        </div>

        <div
          className={
            !nav
              ? "hidden"
              : "flex flex-col items-start font-bold justify-start bg-white w-full h-screen"
          }
        >
          {navLinks.map((navLink) => (
            <Link
              key={navLink.id}
              href={navLink.url}
              className={clsx(
                "mx-2 py-2 text-[16px] text-[#020202] font-bold leading-normal",
                {
                  "border-b-2  border-[#A90000]": pathname === navLink.url,
                }
              )}
            >
              {navLink.title}
            </Link>
          ))}
          {/* <div className='flex flex-col mb-4 md:hidden'>
            <button >
              <Link href='/' className='border border-[#A90000] rounded-3xl flex items-center justify-center px-4 w-[92px] h-[32px] flex-shrink-0 py-1 '>
                  <p className={`${sans_hebrew.className} text-[14px] leading-none font-bold text-[#020202]`}>Sign Up</p>
                </Link>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
