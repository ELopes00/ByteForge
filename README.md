# ByteForge

A static multi-page website for **ByteForge**, a general computer store — laptops, desktops, components, peripherals and repair services.

## Pages

- **`index.html`** — Home: hero, store highlights, featured products, newsletter signup
- **`product.html`** — Product catalog: filterable by category (laptops, desktops, components, peripherals, services), with pricing and stock status
- **`identity.html`** — Brand & visual identity: logo usage, color palette, typography, imagery style and voice
- **`contact.html`** — Contact & address: store info, opening hours, map, contact form
- **`faq.html`** — Help Center: searchable FAQ organized by topic (orders & shipping, repairs & warranty, products & compatibility, returns & refunds)

## Structure

```
├── index.html
├── product.html
├── identity.html
├── contact.html
├── faq.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Viewing the site

This is a static site with no build step or dependencies. To view it locally, serve the folder with any static file server, for example:

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser. (Opening `index.html` directly via `file://` also works, but some browsers restrict local file access for scripts.)
