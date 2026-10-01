"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, menuItems, type MenuItem } from "./catalog";

const whatsappNumber = "628567701987";

function orderLink(item?: MenuItem) {
  const message = item
    ? item.price
      ? `Halo Bakoel Nyonya Lie, saya ingin pesan ${item.name} (${item.price}). Apakah tersedia?`
      : `Halo Bakoel Nyonya Lie, saya ingin pesan ${item.name}. Boleh minta info harga dan ketersediaannya?`
    : "Halo Bakoel Nyonya Lie, saya ingin tanya menu dan ketersediaan hari ini.";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function MenuCard({ item, onOpenImage }: { item: MenuItem; onOpenImage: (item: MenuItem) => void }) {
  const canOpenImage = Boolean(item.image);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!canOpenImage || (event.target instanceof HTMLElement && event.target.closest("a, button"))) {
      return;
    }

    onOpenImage(item);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!canOpenImage || (event.target instanceof HTMLElement && event.target.closest("a, button"))) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenImage(item);
    }
  };

  return (
    <article
      className={`menu-card${item.image ? " menu-card--clickable" : " menu-card--no-image"}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={canOpenImage ? 0 : undefined}
      role={canOpenImage ? "button" : undefined}
      aria-label={canOpenImage ? `Buka foto lengkap ${item.name}` : undefined}
    >
      {item.image ? (
        <div className="menu-card__image-wrap">
          <img
            src={item.image}
            alt={item.name}
            className="menu-card__image"
            loading="lazy"
          />
          <span className="menu-card__category">{item.category}</span>
        </div>
      ) : (
        <div className="menu-card__art" aria-hidden="true">
          <span>Buatan rumah</span>
          <span>♥</span>
        </div>
      )}
      <div className="menu-card__body">
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className="menu-card__footer">
          {item.price ? (
            <>
              <span className="menu-card__price">{item.price}</span>
              <a
                href={orderLink(item)}
                className="order-link"
                target="_blank"
                rel="noreferrer"
                aria-label={`Pesan ${item.name} via WhatsApp`}
              >
                Pesan <span aria-hidden="true">↗</span>
              </a>
            </>
          ) : (
            <a
              href={orderLink(item)}
              className="order-link"
              target="_blank"
              rel="noreferrer"
              aria-label={`Tanya harga ${item.name} via WhatsApp`}
            >
              Tanya harga <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");

    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchesQuery =
        !query ||
        item.name.toLocaleLowerCase("id-ID").includes(query) ||
        item.description.toLocaleLowerCase("id-ID").includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [search, selectedCategory]);

  const scrollToMenu = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <nav className="site-nav" aria-label="Navigasi utama">
        <a className="brand" href="#top" aria-label="Bakoel Nyonya Lie, kembali ke atas">
          <img
            src="/images/brand/bakoel-nyonya-lie-logo.jpeg"
            alt=""
            className="brand__logo"
          />
          <span>
            <strong>Bakoel</strong>
            <small>Nyonya Lie</small>
          </span>
        </a>
        <div className="site-nav__links">
          <a href="#catalogue">Katalog</a>
          <a
            href="https://www.instagram.com/bakoel_nyonyalie/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
        <a href={orderLink()} className="nav-order" target="_blank" rel="noreferrer">
          Pesan via WA <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span /> Kue rumahan • jajanan Indonesia
          </p>
          <h1>
            Kue hangat,
            <em> dibuat dengan hati.</em>
          </h1>
          <p className="hero__text">
            Dari jajanan pasar yang dikangenin sampai camilan gurih untuk berbagi.
            Pilih favoritmu, lalu pesan langsung lewat WhatsApp.
          </p>
          <div className="hero__actions">
            <button type="button" className="button button--dark" onClick={scrollToMenu}>
              Lihat katalog <span aria-hidden="true">↓</span>
            </button>
            <a
              href="https://www.instagram.com/bakoel_nyonyalie/"
              className="button button--text"
              target="_blank"
              rel="noreferrer"
            >
              Ikuti di Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero__note">
            <span className="hero__note-mark">✦</span>
            Harga tercantum di katalog. Yang belum ada harga, tanya kami.
          </div>
        </div>

        <div className="hero__visual" aria-label="Pilihan kue Bakoel Nyonya Lie">
          <div className="hero__stamp">made<br />with<br /><i>love</i></div>
          <div className="hero__photo hero__photo--large">
            <img src="/images/menu/fruit-pies.jpeg" alt="Pilihan pie buah Bakoel Nyonya Lie" />
          </div>
          <div className="hero__photo hero__photo--tall">
            <img src="/images/menu/donat-mini.jpeg" alt="Donat mini beraneka topping" />
          </div>
          <div className="hero__photo hero__photo--small">
            <img src="/images/menu/bolu-semangka.jpeg" alt="Bolu semangka berwarna ceria" />
          </div>
          <span className="hero__scribble">freshly<br />made <b>♥</b></span>
        </div>
      </section>

      <section className="trust-strip" aria-label="Keunggulan Bakoel Nyonya Lie">
        <p>✦ Dibuat fresh</p>
        <span />
        <p>✦ Pesan via WhatsApp</p>
        <span />
        <p>✦ Manis & gurih untuk semua momen</p>
      </section>

      <section className="catalogue" id="catalogue">
        <header className="section-heading">
          <div>
            <p className="section-heading__eyebrow">The good stuff</p>
            <h2>Temukan yang kamu suka.</h2>
          </div>
          <p>
            {menuItems.length} pilihan kue, cake, dan jajanan gurih.
          </p>
        </header>

        <div className="catalogue-controls">
          <div className="category-tabs" aria-label="Filter kategori">
            {["Semua", ...categories].map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? "is-active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <span className="sr-only">Cari menu</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari menu"
              type="search"
            />
          </label>
        </div>

        {visibleItems.length ? (
          <div className="menu-grid">
            {visibleItems.map((item) => (
              <MenuCard key={item.id} item={item} onOpenImage={setSelectedImage} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>♡</span>
            <h3>Belum ketemu.</h3>
            <p>Coba kata kunci lain atau chat kami untuk tanya menu hari ini.</p>
            <a href={orderLink()} target="_blank" rel="noreferrer">Chat di WhatsApp ↗</a>
          </div>
        )}
      </section>

      <section className="order-banner">
        <div className="order-banner__flourish" aria-hidden="true">✳</div>
        <div>
          <p className="section-heading__eyebrow">Need a hand choosing?</p>
          <h2>Tanya stok hari ini, atau rekomendasi kami.</h2>
        </div>
        <a href={orderLink()} className="button button--cream" target="_blank" rel="noreferrer">
          Chat WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#top">
          <img src="/images/brand/bakoel-nyonya-lie-logo.jpeg" alt="" className="brand__logo" />
          <span>
            <strong>Bakoel</strong>
            <small>Nyonya Lie</small>
          </span>
        </a>
        <p>Rumahan, hangat, dan selalu dibuat dengan cinta.</p>
        <div>
          <a href="https://www.instagram.com/bakoel_nyonyalie/" target="_blank" rel="noreferrer">
            @bakoel_nyonyalie ↗
          </a>
          <a href={orderLink()} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </footer>

      <div className="mobile-order">
        <span>Pesan favoritmu</span>
        <a href={orderLink()} target="_blank" rel="noreferrer">WhatsApp ↗</a>
      </div>

      {selectedImage?.image ? (
        <div
          className="image-modal"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <div
            className="image-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
          >
            <div className="image-modal__header">
              <div>
                <p className="image-modal__eyebrow">{selectedImage.category}</p>
                <h2 id="image-modal-title">{selectedImage.name}</h2>
                {selectedImage.price ? <p className="image-modal__price">{selectedImage.price}</p> : null}
              </div>
              <button
                type="button"
                className="image-modal__close"
                onClick={() => setSelectedImage(null)}
                aria-label="Tutup foto"
                autoFocus
              >
                ×
              </button>
            </div>
            <div className="image-modal__image-wrap">
              <img src={selectedImage.image} alt={selectedImage.name} />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
