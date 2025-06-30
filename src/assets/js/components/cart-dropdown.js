import {
    createPopper
} from '@popperjs/core';

(function () {
    const cartWrap = document.querySelector('.dropdown-cart');
    const dropdown = document.querySelector('.cart-dropdown');
    const closeCartBtns = document.querySelectorAll('.btn-close-cart') || [];
    const cartButton = cartWrap ? cartWrap.querySelector('button') : null;
    const cartCountElement = cartWrap ? cartWrap.querySelector('.cart-count') : null;
    const cartItemsContainer = document.querySelector('.cart-dropdown > div:nth-child(2)');
    const cartTotalElement = document.querySelector('.cart-dropdown .fw-bold.fs-5 + p');
    
    // Cart state
    let cartItems = [
        {
            id: 1,
            name: "Aṣọ Òkè Classic Pants",
            price: 85.00,
            qty: 1,
            options: "Size: M",
            img: "{{webRoot}}/assets/images/products/product-cart-1.jpg"
        },
        {
            id: 2,
            name: "Premium Woven Jacket",
            price: 125.00,
            qty: 1,
            options: "Size: L",
            img: "{{webRoot}}/assets/images/products/product-cart-2.jpg"
        }
    ];

    if (cartWrap) {
        
        // Pass the cartWrap, the cart dropdown, and some options, and Popper will do the
        // magic positioning for you:
        const popperInstance = createPopper(cartWrap, dropdown, {
            placement: 'bottom-end',
        });

        /**
         * Show Popper
         */
        function show() {
            dropdown.setAttribute('data-show', '');

            // Enable the event listeners
            popperInstance.setOptions({
                modifiers: [{
                    name: 'eventListeners',
                    enabled: true
                }],
            });

            popperInstance.update();
        }

        /**
         * Hide Popper
         */
        function hide() {
            dropdown.removeAttribute('data-show');

            // Disable the event listeners
            popperInstance.setOptions({
                modifiers: [{
                    name: 'eventListeners',
                    enabled: false
                }],
            });
        }


        /**
         * Update cart count in the UI
         */
        function updateCartCount() {
            if (cartCountElement) {
                const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
                cartCountElement.textContent = totalItems;
                
                // Update cart summary header
                const cartSummaryHeader = dropdown.querySelector('h6.fw-bolder');
                if (cartSummaryHeader) {
                    cartSummaryHeader.textContent = `Cart Summary (${totalItems} items)`;
                }
            }
        }
        
        /**
         * Calculate and update cart total
         */
        function updateCartTotal() {
            const subtotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
            const tax = subtotal * 0.1; // Assuming 10% tax
            const grandTotal = subtotal + tax;
            
            // Update the total in the UI
            if (cartTotalElement) {
                cartTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
                
                // Update tax text
                const taxElement = dropdown.querySelector('.text-muted.small');
                if (taxElement) {
                    taxElement.textContent = `Inc $${tax.toFixed(2)} sales tax`;
                }
            }
        }
        
        /**
         * Render cart items in the dropdown
         */
        function renderCartItems() {
            if (!cartItemsContainer) return;
            
            // Clear current items
            cartItemsContainer.innerHTML = '';
            
            // Add each item to the cart
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'row mx-0 py-4 g-0 border-bottom';
                itemElement.innerHTML = `
                    <div class="col-2 position-relative">
                        <picture class="d-block ">
                            <img class="img-fluid" src="${item.img}" alt="${item.name}">
                        </picture>
                    </div>
                    <div class="col-9 offset-1">
                        <div>
                            <h6 class="justify-content-between d-flex align-items-start mb-2">
                                ${item.name}
                                <i class="ri-close-line ms-3 remove-item" data-item-id="${item.id}"></i>
                            </h6>
                            <span class="d-block text-muted fw-bolder text-uppercase fs-9">${item.options}</span>
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="quantity-selector input-group input-group-sm">
                                    <button class="btn btn-outline-dark border-0 p-0 decrease-qty" data-item-id="${item.id}">−</button>
                                    <input type="text" class="form-control bg-transparent border-0 px-2 text-center" value="${item.qty}" readonly>
                                    <button class="btn btn-outline-dark border-0 p-0 increase-qty" data-item-id="${item.id}">+</button>
                                </div>
                                <p class="fs-6 fw-bolder text-end mb-0">$${(item.price * item.qty).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
            
            // Add event listeners to the newly created elements
            attachCartItemEvents();
        }
        
        /**
         * Attach event listeners to cart item buttons
         */
        function attachCartItemEvents() {
            // Remove item buttons
            const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-item-id'));
                    removeFromCart(itemId);
                });
            });
            
            // Decrease quantity buttons
            const decreaseButtons = cartItemsContainer.querySelectorAll('.decrease-qty');
            decreaseButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-item-id'));
                    updateItemQuantity(itemId, -1);
                });
            });
            
            // Increase quantity buttons
            const increaseButtons = cartItemsContainer.querySelectorAll('.increase-qty');
            increaseButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-item-id'));
                    updateItemQuantity(itemId, 1);
                });
            });
        }
        
        /**
         * Add item to cart
         * @param {Object} item - The item to add
         */
        function addToCart(item) {
            const existingItem = cartItems.find(i => i.id === item.id);
            
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cartItems.push({...item, qty: 1});
            }
            
            updateCart();
        }
        
        /**
         * Remove item from cart
         * @param {number} itemId - The ID of the item to remove
         */
        function removeFromCart(itemId) {
            cartItems = cartItems.filter(item => item.id !== itemId);
            updateCart();
        }
        
        /**
         * Update item quantity
         * @param {number} itemId - The ID of the item to update
         * @param {number} change - The amount to change the quantity by
         */
        function updateItemQuantity(itemId, change) {
            const item = cartItems.find(i => i.id === itemId);
            
            if (item) {
                item.qty += change;
                
                if (item.qty <= 0) {
                    removeFromCart(itemId);
                } else {
                    updateCart();
                }
            }
        }
        
        /**
         * Update the entire cart UI
         */
        function updateCart() {
            updateCartCount();
            renderCartItems();
            updateCartTotal();
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
        
        /**
         * Initialize the cart
         */
        function initCart() {
            // Load cart from localStorage if available
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    cartItems = JSON.parse(savedCart);
                } catch (e) {
                    console.error('Error parsing saved cart:', e);
                }
            }
            
            updateCart();
            
            // Make the cart button clickable
            if (cartButton) {
                cartButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (dropdown.hasAttribute('data-show')) {
                        hide();
                    } else {
                        show();
                    }
                });
            }
        }
        
        /**
         * Handle click outside our cart dropdown
         * @param {*} event 
         * @returns 
         */
        function closeOnClickOutside(event) {
            let target = event.target;

            do {
                if (target === cartWrap) {
                    return;
                }
                target = target.parentNode;
            } while (target);

            hide();
        }

        // Change from hover to click for better mobile experience
        const showEvents = ['click', 'touchstart'];
        
        // Hide cart events - remove mouseleave to prevent accidental closing
        const hideEvents = [];

        showEvents.forEach(event => {
            if (cartButton) {
                cartButton.addEventListener(event, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dropdown.hasAttribute('data-show')) {
                        hide();
                    } else {
                        show();
                    }
                });
            }
        });

        hideEvents.forEach(event => {
            cartWrap.addEventListener(event, hide);
        });

        // Handle clicks outside the cart
        document.addEventListener('click', function (event) {
            closeOnClickOutside(event);
        });

        document.addEventListener('touchstart', function (event) {
            closeOnClickOutside(event);
        });

        // Event listeners for closing cart dropdown via button
        closeCartBtns.forEach(function (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hide();
            });
            btn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hide();
            });
        });
        
        // Initialize the cart
        initCart();

    }
})();