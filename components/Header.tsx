"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <header>
      <nav className={``}>
        <ul className="flex items-center">
          <li className={`py-3`}>
            <div className={`w-[105px] max-h-8`}>
              <Image
                className={`cursor-pointer`}
                src="/logo.svg"
                alt="logo"
                quality={100}
                width={105}
                height={32}
              />
            </div>
          </li>
          <div
            className={`py-1 pl-[103px] flex  items-center gap-x-8 text-neutral-600 w-full`}
          >
            <li className={`hidden xl:block text-base`}>
              <Link href="#">Shop all</Link>
            </li>
            <li className={`hidden xl:block text-base`}>
              <Link href="#">Latest arrivals</Link>
            </li>
            <div className={`ml-auto flex gap-x-4`}>
              {!isSidebarOpen && (
                <li className={`cursor-pointer`}>
                  <Image
                    src={`/cta-buttons.svg`}
                    alt={`Shopping cart`}
                    width={24}
                    height={24}
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
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
              <li className={`px-3 py-2`}>
                <Link href="#" className={`text-sm`}>
                  Shop all
                </Link>
              </li>
              <li className={`px-3 py-2`}>
                <Link href="#" className={`text-sm`}>
                  Latest arrivals
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
