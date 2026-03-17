
// src/components/MenuSection.jsx
import { MENU } from '@/data';

export default function MenuSection() {
  return (
    <section id="menu" className="gallery fade-in">
      <div className="menu-background"></div>
      <div className="menu-content-scroll">
        <h2 className="menu-heading fade-in">Our Menu</h2>
        <div className="menu-list-container">
          {MENU.map(category => (
            <div key={category.id} className="menu-category-section">
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((it, i) => (
                  <li key={i} className="menu-item-list">
                    <div>
                      <strong>{it.name}</strong>
                      {it.desc && <div className="item-desc">{it.desc}</div>}
                    </div>
                    <div className="item-price">${it.price}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}