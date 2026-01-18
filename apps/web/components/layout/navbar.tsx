"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.2, 
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center bg-transparent px-4 md:px-8 lg:px-[145px] pt-[35px] relative z-50">
        {/* Logo */}
        <div className="flex items-center z-50">
          <Image
            src="/logo/agora logo.svg"
            alt="Agora Logo"
            width={100}
            height={30}
            className="h-auto w-auto"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink href="#" icon="/icons/earth.svg" text="Discover Events" />
          <NavLink href="#" icon="/icons/dollar-circle.svg" text="Pricing" />
          <NavLink
            href="#"
            icon="/icons/stellar-xlm-logo 1.svg"
            text="Stellar Ecosystem"
          />
          <NavLink href="#" icon="/icons/help-circle.svg" text="FAQs" />
        </div>

        {/* Desktop Action Button */}
        <div className="hidden lg:block">
          <Button
            backgroundColor="bg-white"
            textColor="text-black"
            shadowColor="rgba(0,0,0,1)"
          >
            <span>Create Your Event</span>
            <Image
              src="/icons/arrow-up-right-01.svg"
              alt="Arrow"
              width={24}
              height={24}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden z-50 flex flex-col justify-center items-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-black/10 hover:bg-white/20 transition-colors"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-[5px]">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-full h-[2px] bg-black rounded-full origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-[2px] bg-black rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-full h-[2px] bg-black rounded-full origin-center"
            />
          </div>
        </button>
      </nav>

      {/* Mobile Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Side Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-2xl flex flex-col p-8 pt-24 lg:hidden"
            >
              <button
                onClick={toggleMenu}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close Menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex flex-col gap-6">
                <MobileNavLink
                  i={0}
                  href="#"
                  icon="/icons/earth.svg"
                  text="Discover Events"
                />
                <MobileNavLink
                  i={1}
                  href="#"
                  icon="/icons/dollar-circle.svg"
                  text="Pricing"
                />
                <MobileNavLink
                  i={2}
                  href="#"
                  icon="/icons/stellar-xlm-logo 1.svg"
                  text="Stellar Ecosystem"
                />
                <MobileNavLink
                  i={3}
                  href="#"
                  icon="/icons/help-circle.svg"
                  text="FAQs"
                />

                <motion.div custom={4} variants={linkVariants} className="mt-4">
                  <Button
                    className="w-full justify-center"
                    backgroundColor="bg-black"
                    textColor="text-white"
                    shadowColor="rgba(0,0,0,0.5)"
                  >
                    <span>Create Your Event</span>
                    <Image
                      src="/icons/arrow-up-right-01.svg"
                      alt="Arrow"
                      width={24}
                      height={24}
                      className="invert group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-[15px] font-medium hover:opacity-80 transition-opacity"
    >
      <Image src={icon} alt={text} width={24} height={24} />
      <span>{text}</span>
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  text,
  i,
}: {
  href: string;
  icon: string;
  text: string;
  i: number;
}) {
  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div custom={i} variants={linkVariants}>
      <Link
        href={href}
        className="flex items-center gap-3 text-lg font-medium hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-gray-50"
      >
        <Image src={icon} alt={text} width={24} height={24} />
        <span>{text}</span>
      </Link>
    </motion.div>
  );
}
