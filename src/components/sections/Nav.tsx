"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import { brand } from "@/lib/assets";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu after an anchor navigation
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("ashro:navigate", close);
    return () => window.removeEventListener("ashro:navigate", close);
  }, []);

  // lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border pl-4 pr-3 transition-all duration-500",
            scrolled
              ? "border-white/10 bg-bg/70 py-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent py-2.5",
          )}
        >
          <a
            href="#top"
            aria-label="Ashro Design — home"
            className="relative z-10 flex items-center"
          >
            <Image
              src={brand.logoWhite}
              alt="Ashro Design"
              width={110}
              height={35}
              priority
              className="h-8 w-auto"
            />
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="#contact" size="md">
              Book a Strategy Call
            </Button>
          </div>

          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fg transition-colors hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full cursor-default bg-bg/80 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              className="absolute inset-x-4 top-24 rounded-3xl border border-white/10 bg-surface/80 p-4 backdrop-blur-xl"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-fg/90 transition-colors hover:bg-white/5"
                    >
                      <span>{l.label}</span>
                      <span className="text-sm text-muted-2">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 px-1 pb-1">
                <Button href="#contact" className="w-full">
                  Book a Strategy Call
                </Button>
              </div>
              <div className="mt-4 border-t border-white/10 px-1 pt-4">
                <SocialLinks className="justify-center" />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
