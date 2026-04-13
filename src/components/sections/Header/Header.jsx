"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./header.css";
import PrimaryCta from "../../Buttons/form-cta/Primary-cta";
import slLogo from "../../../assets/logo/sohanlalandco.png";

export default function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const apply = () => {
      /*
       * Hero section is 90vh tall. Main has paddingTop 80px (header height).
       * Switch the header back to opaque when the user has scrolled ~80% of
       * the hero's height — early enough for the 500ms transition to complete
       * before the Category section fully appears.
       */
      const threshold = window.innerHeight * 0.78;
      header.classList.toggle("sl-header--hero", window.scrollY < threshold);
    };

    apply(); // set correct state on mount (handles hard-refresh at top)
    window.addEventListener("scroll", apply, { passive: true });
    return () => window.removeEventListener("scroll", apply);
  }, []);

  return (
    <header className="sl-header" ref={headerRef} role="banner">
      <div className="sl-header__inner">
        <div className="sl-header__mobileBar" aria-label="Mobile header">
          <div className="sl-header__mobileLogoSlot" aria-label="Sohanlal logo">
            <Image
              src={slLogo}
              alt="Sohanlal & Company"
              fill
              priority
              className="sl-header__logoImg"
              sizes="120px"
            />
          </div>
        </div>

        <div className="sl-header__logoSlot" aria-label="Sohanlal logo">
          <Image
            src={slLogo}
            alt="Sohanlal & Company"
            fill
            priority
            className="sl-header__logoImg"
            sizes="200px"
          />
        </div>

        <nav className="sl-header__nav" aria-label="Primary">
          <ul className="sl-header__menu">
            <li className="sl-header__menuItem">
              <a className="sl-header__link" href="#">
                HOME
              </a>
            </li>
            <li className="sl-header__menuItem">
              <a className="sl-header__link" href="#">
                CATEGORIES
              </a>
            </li>
            <li className="sl-header__menuItem">
              <a className="sl-header__link" href="#">
                OUR LEGACY
              </a>
            </li>
            <li className="sl-header__menuItem">
              <a className="sl-header__link" href="#">
                TRUSTED BY
              </a>
            </li>
            <li className="sl-header__menuItem">
              <a className="sl-header__link" href="#">
                PRODUCTS
              </a>
            </li>
          </ul>
        </nav>

        <div className="sl-header__ctaSlot">
          <PrimaryCta />
        </div>
      </div>
    </header>
  );
}

