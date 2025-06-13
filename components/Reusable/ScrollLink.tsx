"use client";
import Link from "next/link";

interface ScrollLinkProps {
  href: string;
  children: React.ReactNode;
  classnames?: string;
}

export default function ScrollLink({
  href,
  children,
  classnames,
  ...props
}: ScrollLinkProps) {
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  console.log(classnames);
  return (
    <Link href={href} onClick={handleClick} className={classnames} {...props}>
      {children}
    </Link>
  );
}
