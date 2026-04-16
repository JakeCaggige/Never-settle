// ========================================
// SCROLL ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Hero entrance
  document.body.classList.add('hero-loaded');

  // Intersection Observer for scroll-triggered elements
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0, 10);
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      animObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));
});

// ========================================
// CART DRAWER FUNCTIONALITY
// ========================================

// Toggle cart drawer
function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.toggle('active');
    if (drawer.classList.contains('active')) {
      loadCartItems();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

// Load cart items into drawer
async function loadCartItems() {
  try {
    const response = await fetch('/cart.js');
    const cart = await response.json();
    
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer) return;
    
    // Update total price
    if (cartTotalPrice) {
      cartTotalPrice.textContent = formatMoney(cart.total_price);
    }
    
    // Update cart count
    updateCartCount(cart.item_count);
    
    // Clear and populate items
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <p>Your cart is empty</p>
          <a href="/collections/all" class="cta-primary">Shop Now</a>
        </div>
      `;
      return;
    }
    
    cartItemsContainer.innerHTML = cart.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          ${item.image ? `<img src="${item.image}" alt="${item.product_title}">` : ''}
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.product_title}</div>
          ${item.variant_title ? `<div class="cart-item-variant">${item.variant_title}</div>` : ''}
          <div class="cart-item-quantity">
            <button class="cart-item-qty-btn" onclick="updateCartItemQuantity('${item.key}', ${item.quantity - 1})">−</button>
            <span class="cart-item-qty-value">${item.quantity}</span>
            <button class="cart-item-qty-btn" onclick="updateCartItemQuantity('${item.key}', ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-price">${formatMoney(item.final_line_price)}</div>
          <button class="cart-item-remove" onclick="removeCartItem('${item.key}')">Remove</button>
        </div>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}

// Update cart item quantity
async function updateCartItemQuantity(key, quantity) {
  if (quantity < 1) {
    removeCartItem(key);
    return;
  }
  
  try {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity })
    });
    loadCartItems();
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}

// Remove cart item
async function removeCartItem(key) {
  try {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    });
    loadCartItems();
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

// Update cart count
function updateCartCount(count) {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = count || 0;
  }
}

// Format money
function formatMoney(cents) {
  return '$' + (cents / 100).toFixed(2);
}

// ========================================
// CART DRAWER EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Open cart drawer
  const cartLink = document.querySelector('.cart-link');
  if (cartLink) {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCartDrawer();
    });
  }
  
  // Close cart drawer
  const cartClose = document.querySelector('.cart-close');
  if (cartClose) {
    cartClose.addEventListener('click', toggleCartDrawer);
  }
  
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', toggleCartDrawer);
  }
  
  // Initial cart count load
  fetch('/cart.js')
    .then(response => response.json())
    .then(data => updateCartCount(data.item_count))
    .catch(error => console.error('Error loading cart count:', error));
});

// ========================================
// ADD TO CART FUNCTIONALITY
// ========================================

const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
addToCartForms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable button during submission
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'ADDING...';
    }
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Open cart drawer
        toggleCartDrawer();
      } else {
        alert('Error adding to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    } finally {
      // Re-enable button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'ADD TO CART';
      }
    }
  });
});

// ========================================
// PRODUCT PAGE IMAGE GALLERY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.product-main-image img');
  
  if (thumbnails.length && mainImage) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        // Prefer data-image-url attribute, fallback to src replacement
        const imageUrl = thumb.dataset.imageUrl;
        if (imageUrl) {
          mainImage.src = imageUrl;
        } else {
          const thumbImg = thumb.querySelector('img');
          if (thumbImg) {
            mainImage.src = thumbImg.src.replace('width=150', 'width=800');
            mainImage.alt = thumbImg.alt;
          }
        }
      });
    });
  }
});

// ========================================
// PRODUCT VARIANT SELECTION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const variantButtons = document.querySelectorAll('.size-option');
  const variantInput = document.querySelector('input[name="id"]');
  const priceEl = document.getElementById('product-price');

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\.00$/, '');
  }

  if (variantButtons.length && variantInput) {
    variantButtons.forEach(button => {
      button.addEventListener('click', () => {
        variantButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const variantId = button.getAttribute('data-variant-id');
        if (variantId) variantInput.value = variantId;

        const price = button.getAttribute('data-price');
        if (price && priceEl) priceEl.textContent = formatMoney(parseInt(price, 10));
      });
    });
  }
});
