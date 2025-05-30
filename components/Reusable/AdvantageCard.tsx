import React from "react";
import Image from "next/image";

interface Props {
  icon_src: string;
  title: string;
  text: string;
}

const AdvantageCard = ({ icon_src, title, text }: Props) => {
  return (
    <div className={`flex flex-col items-center text-center gap-y-4`}>
      <Image src={icon_src} alt={`icon`} width={48} height={48} />
      <div className={`space-y-2`}>
        <p className={`text-neutral-900 text-xl font-semibold`}>{title}</p>
        <p className={`text-neutral-600 text-base`}>{text}</p>
      </div>
    </div>
  );
};

export default AdvantageCard;
