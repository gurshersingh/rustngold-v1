'use client';
import { useState } from 'react';
import { MENU } from '@/data';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(MENU[0].id);
  const ref = useScrollReveal();

  const activeMenu = MENU.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="menu reveal-section" ref={ref}>
      <div className="menu__inner">
        <span className="section-label">Our Menu</span>
        <h2 className="section-heading">Crafted with care, served with soul.</h2>

        {/* Category tabs */}
        <div className="menu__tabs" role="tablist">
          {MENU.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`menu__tab ${activeCategory === cat.id ? 'menu__tab--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active category */}
        {activeMenu && (
          <div className="menu__category" key={activeMenu.id}>
            {activeMenu.description && (
              <p className="menu__category-desc">{activeMenu.description}</p>
            )}
            <div className="menu__grid">
              {activeMenu.items.map((item, i) => (
                <div key={i} className="menu-card">
                  <div className="menu-card__header">
                    <h4 className="menu-card__name">{item.name}</h4>
                    <span className="menu-card__price">${item.price}</span>
                  </div>
                  {item.desc && <p className="menu-card__desc">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="menu__cta">
          <a
            href="https://rust-n-gold.nextorder.com"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Online — Free Delivery
          </a>
        </div>
      </div>
    </section>
  );
}
