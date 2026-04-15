"use client";

import { useState } from "react";
import Image from "next/image";
import "./ProductCard.css";

export default function ProductCard({ product, attributeSchema }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="prod-card">
      <div className="prod-card__imgWrap">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 45vw, (max-width: 1100px) 29vw, 22vw"
            className="prod-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="prod-card__imgPlaceholder" aria-label={product.name} />
        )}
      </div>

      <div className="prod-card__info">
        <h3 className="prod-card__name">{product.name}</h3>

        <dl className="prod-card__attrs">
          {attributeSchema.map(({ key, label }) =>
            product.attributes[key] ? (
              <div className="prod-card__attrRow" key={key}>
                <dt className="prod-card__attrLabel">{label}:</dt>
                <dd className="prod-card__attrValue">{product.attributes[key]}</dd>
              </div>
            ) : null
          )}
        </dl>
      </div>
    </article>
  );
}
