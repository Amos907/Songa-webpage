/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { sans_hebrew } from "@/app/ui/fonts";

interface CardInfo {
  title: string;
  description: string;
  image: string;
}

const Partners = [
  "/assets/images/eastmart.jpg",
  "/assets/images/goodlife.jpg",
  "/assets/images/tuskys.png",
];

const CardInfo = [
  {
    title: "Become an AI Rider",
    description:
      "We are using 21st Century technology to digitize our riders and offer quality services.",
    image: "/assets/images/ai.png",
  },
  {
    title: "Customer Service Agent",
    description:
      "Digital riders means digital service. We have paired our riders with an AI twin.",
    image: "/assets/images/chatbot.png",
  },
  {
    title: "24 hrs Services",
    description:
      "Use our ever available agent to seek boda services. We have our riders distributed all over Kenya to take care of your needs.",
    image: "/assets/images/support2.png",
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
    <div className="h-36 flex flex-col justify-center bg-white border border-gray-200 rounded-lg shadow md:h-48 lg:h-64 md:flex-row md:flex-grow md:items-center md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <figure className="hidden md:block rounded-t-lg h-48 md:w-full md:rounded-md relative">
        <Image
          src={`${cardInfo.image}`}
          alt="boba boda riders"
          sizes="100vh"
          fill
          className=""
        />
      </figure>
      <div className="px-2 lg:w-96">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#A90000] dark:text-white">
          {`${cardInfo.title}`}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`${cardInfo.description}`}
        </p>
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

        <div className="w-full h-full pt-24 md:pt-32 bg-[#f1f3f5] bg-opacity-75 absolute z-0 md:px-16 md:space-y-28">
          <div className="px-4 space-y-4 lg:w-1/3">
            <div>
              <div className="flex space-x-2">
                <div className="w-8 h-1.5 bg-black"></div>
                <div className="w-8 h-1.5 bg-red-500"></div>
                <div className="w-8 h-1.5 bg-[#00FF48]"></div>
              </div>
            </div>

            <p
              className={`${sans_hebrew.className} tracking-normal text-[#000000] text-xl font-semibold md:text-2xl md:leading-2 md:tracking-[.0.5em]`}
            >
              SONGA is a learning bodaboda machine that has been trained by
              bodaboda riders to offer services leveraging AI.
            </p>
          </div>

          <div className="lg:flex lg:space-x-3 mt-4 mx-3 space-y-3 lg:space-y-0">
            {CardInfo.map<JSX.Element>((data: CardInfo) => (
              <SectionCard key={data.title} cardInfo={data} />
            ))}
          </div>
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
