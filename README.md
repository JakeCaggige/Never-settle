# Never Settle - Shopify Theme

A premium Shopify theme for Never Settle, the #1 pheromone fragrance brand in America. Built with dark brutalist luxury aesthetics featuring gold accents, Bebas Neue headings, and Cormorant Garamond body text.

---

## 🎨 Design Features

- **Dark brutalist luxury** aesthetic
- **Gold (#D4AF37)** accent color throughout
- **Typography**: Bebas Neue (headings) + Cormorant Garamond (body)
- **Fully responsive** - mobile, tablet, desktop optimized
- **All sections editable** via Shopify theme customizer

---

## 📦 Installation

### Option 1: Upload via Shopify Admin (Recommended)

1. **Zip the theme folder**
2. Go to: **Shopify Admin → Online Store → Themes**
3. Click **"Add theme"** → **"Upload zip file"**
4. Upload `never-settle-shopify-v2.zip`
5. Click **"Customize"** to start editing

### Option 2: Shopify CLI

```bash
shopify theme push
```

---

## 🖼️ Required Assets

You need to download these images from Figma and upload them via the theme customizer:

### Logo Images
- **Icon**: https://www.figma.com/api/mcp/asset/659ced6c-b436-4a3f-bf35-50631f440f52
- **Text**: https://www.figma.com/api/mcp/asset/859393f9-c7ef-40a2-a369-236f8bd349c6

### Hero Image
- **Model photo**: https://www.figma.com/api/mcp/asset/5329e497-af1d-4abf-9839-cdf700b6ebde

**How to upload:**
1. Open the **Theme Customizer**
2. Click **"Header"** section → Upload logo
3. Click **"Hero Section"** → Upload hero background image

---

## ⚙️ Theme Setup

### 1. Create Navigation Menu

Go to: **Shopify Admin → Online Store → Navigation**

Create a menu called **"main-menu"** with these links:
- Home → `/`
- Collection → `/collections/all`
- Discovery Set → `/products/discovery-set`
- About → `/pages/about`
- FAQ → `/pages/faq`

### 2. Create Footer Menus

Create 4 menus for footer columns:

**Shop Menu:**
- All Fragrances → `/collections/all`
- Discovery Set → `/products/discovery-set`
- Best Sellers → `/collections/best-sellers`
- New Arrivals → `/collections/new-arrivals`

**Company Menu:**
- About Us → `/pages/about`
- Our Story → `/pages/our-story`
- Reviews → `/pages/reviews`
- Contact → `/pages/contact`

**Support Menu:**
- FAQ → `/pages/faq`
- Shipping → `/pages/shipping`
- Returns → `/pages/returns`
- Track Order → `/apps/tracking`

**Connect Menu:**
- Instagram → `https://instagram.com/neversettle`
- TikTok → `https://tiktok.com/@neversettle`
- YouTube → `https://youtube.com/@neversettle`
- Email Us → `mailto:hello@neversettle.com`

### 3. Create Products

Create 6 products with these details:

#### Product Setup (Each Product)
1. **Title**: Product name (e.g., "BLACK TIGER")
2. **Price**: $89.00 (50ml) / $149.00 (100ml)
3. **Variants**: Create size variants (50ml, 100ml)
4. **Images**: Upload product photos
5. **Description**: Product copy from scope doc

#### Product Metafields (Optional)
Add these for enhanced display:
- `custom.review_count` (number) - e.g., 127
- `custom.fragrance_notes` (multi-line text) - Top/Heart/Base notes

### 4. Create Collection

1. Go to: **Products → Collections → Create collection**
2. Name: **"All Fragrances"** or **"The Collection"**
3. Add all 6 products
4. Save collection

### 5. Customize Theme Sections

Click **"Customize"** on your theme:

**Announcement Bar:**
- ✅ Enable/disable
- ✏️ Edit text
- 🎨 Change background/text colors

**Header:**
- 🖼️ Upload logo
- 📋 Select navigation menu

**Hero Section:**
- 🖼️ Upload background image
- ✏️ Edit tagline, heading, subheading
- 🔗 Set button text & link

**Trust Badges:**
- ➕ Add/remove badges
- ✏️ Edit badge text (emoji + message)

**Featured Collection:**
- 📋 Select collection to display
- ✏️ Edit section title & subtitle
- 🔢 Set product count (3-12)

**Footer:**
- 📋 Assign menus to each column (4 columns)
- ✏️ Edit column headings

---

## 📄 File Structure

```
never-settle-shopify-v2/
├── layout/
│   └── theme.liquid              # Main layout wrapper
├── templates/
│   ├── index.json                # Homepage
│   ├── product.json              # Product pages
│   └── collection.json           # Collection pages
├── sections/
│   ├── announcement-bar.liquid   # Top banner
│   ├── header.liquid             # Site header
│   ├── hero.liquid               # Hero section
│   ├── trust-badges.liquid       # Trust indicators
│   ├── featured-collection.liquid # Product grid
│   ├── collection-header.liquid  # Collection title
│   ├── main-collection.liquid    # Collection products
│   ├── main-product.liquid       # Product page
│   └── footer.liquid             # Site footer
├── assets/
│   ├── theme.css                 # All styles
│   └── custom.js                 # Cart functionality
└── config/
    └── settings_schema.json      # Theme settings
```

---

## 🎨 Customization Guide

### Colors
All colors use CSS variables in `assets/theme.css`:

```css
--color-black: #000000;
--color-white: #FFFFFF;
--color-gold: #D4AF37;
```

### Typography
Fonts are loaded via Google Fonts in `layout/theme.liquid`:
- **Bebas Neue** - Headings, buttons, labels
- **Cormorant Garamond** - Body text, descriptions

### Spacing
Consistent spacing system:
```css
--spacing-xs: 8px;
--spacing-s: 16px;
--spacing-m: 32px;
--spacing-l: 48px;
--spacing-xl: 64px;
```

---

## 🛒 Product Setup Example

### Black Tiger Product

**Basic Info:**
- Title: `BLACK TIGER`
- Handle: `black-tiger`
- Price: `$89.00` (50ml)

**Variants:**
1. 50ml - $89.00
2. 100ml - $149.00

**Description:**
```
Raw power meets refined elegance. Black Tiger is the scent of dominance 
worn with sophistication—a fragrance that commands attention without asking for it.
```

**Metafields (Optional):**
- `custom.review_count`: `127`
- `custom.fragrance_notes`:
```
Top Notes: Bergamot, Black Pepper, Cardamom
Heart Notes: Leather, Tobacco, Vetiver
Base Notes: Oud, Amber, Musk
```

---

## 📱 Responsive Breakpoints

The theme is fully responsive with breakpoints at:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

---

## ⚡ Performance Features

- ✅ Google Fonts preconnect
- ✅ Lazy loading images
- ✅ Optimized CSS (single file)
- ✅ Minimal JavaScript
- ✅ Cart updates via Fetch API

---

## 🔧 Developer Notes

### Cart Functionality
The cart count updates automatically via `/cart.js` endpoint. The `custom.js` file handles:
- Cart count display in header
- Add to cart form submission
- Error handling

### Product Images
Shopify's `image_url` filter automatically optimizes images:
```liquid
{{ product.featured_image | image_url: width: 800 }}
```

### Section Blocks
Trust badges and footer columns use Shopify's block system for easy reordering/editing in the theme customizer.

---

## 📞 Support

Built by **Stonehut** (Webflow Certified Partner & Freelance Web Design Agency)
- Website: [stonehut.com]
- Location: Vermont, USA

---

## 🎯 Brand Guidelines

**Never Settle Brand Identity:**
- Tagline: "#1 Pheromone Fragrance Brand in America"
- Positioning: Premium, masculine, alpha-focused
- Voice: Confident, aspirational, no-nonsense
- Creed: "Dominate. Win. Never Settle."

**Product Colors (Pantone):**
- Black Tiger: Black
- King of Carnage: Purple (669C / #6B3FA0)
- Ghost Her: Gray (429 / #8B95A0)
- ∞+1,000,000,000,000 +1: Teal (3435C / #00B4B4)
- The GOAT: Olive (7622C / #6B7C59)
- Alpha Boss: Blue (288C / #0F2F8F)

---

## ✅ Checklist Before Launch

- [ ] Upload logo to header
- [ ] Upload hero image
- [ ] Create all 6 products with images
- [ ] Set up navigation menu
- [ ] Create 4 footer menus
- [ ] Create main collection
- [ ] Test add to cart functionality
- [ ] Test on mobile/tablet
- [ ] Review all text content
- [ ] Set up payment gateway
- [ ] Configure shipping rates
- [ ] Set up domain

---

## 📦 Version History

**v1.0.0** (Current)
- Initial release
- Full homepage design
- Product page template
- Collection page template
- All sections editable
- Mobile responsive
