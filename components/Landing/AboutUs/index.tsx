/* eslint-disable @next/next/no-img-element */
"use client"
import Image from "next/image";
import React from "react";
import { sans_hebrew } from "@/app/ui/fonts";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

interface CardInfo {
  title: string;
  description: string;
  image: string;
  link: string;
  key: string;
}

const Partners = [
  "/assets/images/eastmart.jpg",
  "/assets/images/goodlife.jpg",
  "/assets/images/tuskys.png",
];

const CardInfo = [
  {
    title: "Boda Tech",
    description:
      "We are using 21st Century technology to digitize our riders and offer quality services.",
    image: "/assets/images/ai.png",
    key: "REGISTER",
    link: "/register",
  },
  {
    title: "Customer Service Agent",
    description:
      "Chat with songaAI to request for more customized service and overall support around your bodaboda needs.",
    image: "/assets/images/chatbot.png",
    key: "CHATBOT",
    link: "/chatbot",
  },
  {
    title: "24 hrs Services",
    description:
      "We have riders from all over Kenya. We will always use our technology to get you the best rider on our platform ",
    image: "/assets/images/support2.png",
    key: "LEARN MORE",
    link: "/learn-more"
  },
];

function PartnerImage({ image }: { image: string }) {
  return (
    <div className="flex justify-center md:flex-grow">
      <figure className="h-28 w-28 relative">
        <Image src={`${image}`} alt="boba boda riders" sizes="100vh" fill />
      </figure>
    </div>
  );
}

function SectionCard({ cardInfo }: { cardInfo: CardInfo }) {
  return (
    <div className="h-36 flex flex-col justify-center bg-[#f1f3f5] border border-gray-200 rounded-lg shadow md:h-48 lg:h-64 md:flex-row md:flex-grow md:items-center md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* <figure className="hidden md:block rounded-t-lg h-48 md:w-full md:rounded-md relative">
        <Image
          src={`${cardInfo.image}`}
          alt="boba boda riders"
          sizes="100vh"
          fill
          className=""
        />
      </figure> */}
      <div className="px-2 lg:w-96 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#A90000] dark:text-white">
          {`${cardInfo.title}`}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`${cardInfo.description}`}
        </p>
        <Link href={cardInfo.link} className="mb-3 font-extrabold text-[#0F9434] text-lg cursor- ">
          <p>{`${cardInfo.key}`}</p>
        </Link>
      </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="h-[100vh] ">
      <div className="relative h-full w-screen">
        <div className="w-full">
          <figure>
            <Image
              src="/assets/images/boda-delivery.jpg"
              alt="boba boda riders"
              sizes="100vh"
              fill
              className="object-cover md:object-fill"
            />
          </figure>
        </div>

        <div className="w-full h-full pt-18 md:pt-24 bg-black bg-opacity-75 absolute z-0 md:px-16 md:space-y-28">
          <div className="px-4 space-y-4 lg:w-1/3">
              <div className="flex space-x-2">
                <div className="w-8 h-1.5 bg-white"></div>
                <div className="w-8 h-1.5 bg-red-500"></div>
                <div className="w-8 h-1.5 bg-[#00FF48]"></div>
              </div>
              <p
                className={`${sans_hebrew.className} tracking-normal text-[#FFFFFF] text-lg font-semibold md:text-xl md:leading-normal `}
              >
                SONGA is a bodaboda rider&apos;s Smart App that gives him a digital experience.
                In the technology of 21 Century , we aim to leverage what we know incorporating AI to improve service delivery.
              </p>
          </div>
          <Fade direction="up" cascade triggerOnce={false} >
          <div className="lg:flex lg:space-x-3 mt-4 mx-3 space-y-3 lg:space-y-0">
            {CardInfo.map<JSX.Element>((data: CardInfo) => (
              <SectionCard key={data.title} cardInfo={data} />
            ))}
          </div>
          </Fade>
        </div>
      </div>

            {/* commented out partner section -- to be uncommented later */}
      {/* <div className="w-full md:h-36 mt-4 text-center shadow-sm bg-white">
        <div className="space-y-2 md:flex items-center md:px-16">
          <p className="text-[#A90000] text-3xl">Trusted By</p>
          {Partners.map<JSX.Element>((image: string) => (
            <PartnerImage key={image} image={image} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
