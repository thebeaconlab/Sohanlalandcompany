"use client";

import Image from "next/image";
import "./Footer.css";
import slLogo from "../../assets/logo/sohanlalandco.png";

const FOOTER_SECTIONS = [
  {
    heading: "Products",
    items: [
      "Bricks & Blocks",
      "Paving Solutions",
      "Facade & Wall Cladding",
      "Architecture & Landscape",
    ],
  },
  {
    heading: "Information",
    items: ["Privacy Policies", "Terms & Conditions"],
  },
  {
    heading: "Address",
    items: ["VILLAGE BIROMAJRI", "NEAR MANAKPUR", "PUNJAB, 140602"],
  },
  {
    heading: "Contact",
    items: ["+91 60006-73537", "midaskrpandita@gmail.com", "write us"],
  },
];

export default function Footer() {
  return (
    <footer className="sl-footer" role="contentinfo">
      <div className="sl-footer__panel">
        <div className="sl-footer__brand">
          <Image
            src={slLogo}
            alt="Sohan Lal & Company"
            width={160}
            height={62}
            className="sl-footer__logo"
            sizes="160px"
          />
        </div>

        <div className="sl-footer__content">
          <h2 className="sl-footer__title">
            <span>Shaping Structure.</span>
            <span>Defining Surfaces.</span>
          </h2>

          <div className="sl-footer__grid" aria-label="Footer links and contact">
            {FOOTER_SECTIONS.map((section) => (
              <div className="sl-footer__cell" key={section.heading}>
                <h3 className="sl-footer__heading">{section.heading}</h3>
                <ul className="sl-footer__items">
                  {section.items.map((item) => (
                    <li className="sl-footer__item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="sl-footer__copyright">
        2026 &copy; All Rights Reserved Sohan Lal &amp; Co. &amp; Choudhery Infratech
      </p>
    </footer>
  );
}
