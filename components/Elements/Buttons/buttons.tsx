import React from "react";
import Link from "next/link";

interface StoreButtons {
  text: string;
  url: string;
  icon: string;
}

interface HeroButtons {
  text: string;
  url: string;
  onClick: () => void;
}

interface AppButtons {
  text: string;
  url: string;
}

export const StoreButtons = ({ text, url, icon }: StoreButtons) => {
  return (
    <div className="pt-4">
      <Link href={url}>
        <button className="border-none bg-[#000000] px-2 py-[8px] outline-none text-white rounded-md">
          {icon} {text}
        </button>
      </Link>
    </div>
  );
};

export const HeroButtons = ({ text, url, onClick, }: HeroButtons) => {
  return (
    <div className="pt-4">
      <Link href={url}>
        <button onClick={onClick} className="border-none bg-[#A90000] font-bold px-12 py-[8px] w-[250px] outline-none text-[#ffffff] text-center text-[16px] rounded-lg">
          {text}
        </button>
      </Link>
    </div>
  );
};

export const AppButtons = ({ text, url }: AppButtons) => {
  return (
    <div className="pt-4">
      <Link href={url}>
        <button className="border-none bg-[#FFFFFF] font-bold px-4 py-[8px] w-auto outline-none text-[#000000] text-center text-[16px] rounded-full">
          {text}
        </button>
      </Link>
    </div>
  );
};

export const ServiceButtons = ({
  text,
  onClick,
  active,
}: {
  text: string;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <div className="pt-4">
      <button
        onClick={onClick}
        className={`border border-[#222222] font-bold px-4 py-[8px] w-auto text-[#000000] text-center text-[16px] rounded-full ${
          active ? "bg-[#000000] text-white" : ""
        }`}
      >
        {text}
      </button>
    </div>
  );
};
