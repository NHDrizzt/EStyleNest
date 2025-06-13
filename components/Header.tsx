"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/storeHooks";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const cart = useAppSelector((state) => state.cart);

  const handleScrollLink = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header>
      <nav className={``}>
        <ul className="flex items-center">
          <li className={`py-3`}>
            <Link href="/" className={`w-[105px] max-h-8`}>
              <Image
                className={`cursor-pointer`}
                src="/logo.svg"
                alt="logo"
                quality={100}
                width={105}
                height={32}
              />
            </Link>
          </li>
          <div
            className={`py-1 pl-[103px] flex  items-center gap-x-8 text-neutral-600 w-full`}
          >
            <li className={`hidden xl:block text-base group`}>
              <Link href="/" className={`relative group-hover:text-indigo-600`}>
                Shop all
                <span
                  className={`absolute -bottom-0.5 left-0 w-0 h-[1px]  bg-indigo-600 transition-all duration-300 ease-in-out group-hover:w-full`}
                ></span>
              </Link>
            </li>
            <li className={`hidden xl:block text-base group`}>
              <Link
                href="#latest-arrivals"
                className={`relative group-hover:text-indigo-600 cursor-pointer`}
                onClick={(e) => handleScrollLink(e, "latest-arrivals")}
              >
                Latest arrivals
                <span
                  className={`absolute -bottom-0.5 left-0 w-0 h-[1px] bg-indigo-600 transition-all duration-300 ease-in-out group-hover:w-full`}
                ></span>
              </Link>
            </li>
            <div className={`ml-auto flex gap-x-4`}>
              {!isSidebarOpen && (
                <li
                  className={`cursor-pointer relative`}
                  onClick={() => router.push("/cart")}
                >
                  <Image
                    src={`/cta-buttons.svg`}
                    alt={`Shopping cart`}
                    width={24}
                    height={24}
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                  {cart.items.length > 0 && (
                    <div
                      className={`rounded-full absolute -top-2 -right-2 w-4.5 h-4.5 bg-indigo-700 z-50 text-white flex items-center justify-center`}
                    >
                      {cart.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </div>
                  )}
                </li>
              )}

              <button
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                className={`xl:hidden`}
              >
                {!isSidebarOpen ? (
                  <Image
                    src={`/ham.svg`}
                    alt={`Sidebar Icon`}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src={`/close.svg`}
                    alt={`Sidebar Icon`}
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
          </div>
        </ul>
      </nav>
      {isSidebarOpen && (
        <div className={`absolute right-0 w-full  pt-1 px-4 h-screen z-50`}>
          <div>
            <ul>
              <li className="px-3 py-2 group">
                <Link
                  href="#"
                  className="relative text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Shop all
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="px-3 py-2 group">
                <Link
                  href="#"
                  className="relative text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Latest arrivals
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
