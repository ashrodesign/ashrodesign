import Image from "next/image";
import { navLinks, services, contactInfo } from "@/lib/data";
import { brand } from "@/lib/assets";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-white/10 px-6 pb-10 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand + newsletter */}
          <div>
            <Image
              src={brand.logoWhite}
              alt="Ashro Design"
              width={126}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The all-in-one marketing team for Bahamian e-commerce — web, ads,
              email, SMS, and design under one roof.
            </p>
            <div className="mt-6 max-w-xs">
              <p className="mb-2 text-sm font-medium text-fg">
                Get marketing tips for your store
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* quick links */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold text-fg">Explore</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <div>
            <h3 className="text-sm font-semibold text-fg">Services</h3>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {s.title.replace(" & E-Commerce Development", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-sm font-semibold text-fg">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="link-underline text-muted transition-colors hover:text-fg"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phoneHref}`}
                  className="link-underline text-muted transition-colors hover:text-fg"
                >
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
            <SocialLinks className="mt-6" />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-2 sm:flex-row">
          <p>&copy; {year} Ashro Design. All rights reserved.</p>
          <p>Imagery via Unsplash. Built for Bahamian businesses.</p>
        </div>
      </div>
    </footer>
  );
}
