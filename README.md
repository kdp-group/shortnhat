# Short and Hat - Premium Fashion E-commerce

## Overview
Short and Hat is a premium fashion e-commerce platform specializing in stylish shorts and hats for the modern individual. Our online store offers a curated selection of high-quality, fashion-forward pieces that combine comfort with contemporary style.

<strong><a href="#">Visit Store</a> | <a href="#">Shop Now</a></strong>

![Short and Hat - Premium Fashion E-commerce](src/assets/images/hero/hero-full.jpg "Short and Hat | Premium Fashion E-commerce")

## Table of contents

- [About Us](#about-us)
- [Our Collections](#our-collections)
- [Key Features](#key-features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Contact Us](#contact-us)


## About Us
Short and Hat was born from a passion for contemporary fashion and a commitment to quality. We believe that great style starts with the perfect fit and exceptional materials. Our collections are carefully curated to bring you the latest trends while maintaining timeless appeal.


## Our Collections

### Shorts Collection
- **Casual Shorts**: Perfect for everyday comfort
- **Athletic Shorts**: Designed for performance and style
- **Designer Shorts**: Premium styles for the fashion-forward

### Hats Collection
- **Baseball Caps**: Classic styles with modern twists
- **Bucket Hats**: Trendy and practical
- **Dad Hats**: Laid-back and comfortable


## Key Features

- **User-Friendly Navigation**: Intuitive category and product browsing
- **Responsive Design**: Perfect shopping experience on any device
- **Secure Checkout**: Multiple payment options for your convenience
- **Product Reviews**: Real customer feedback and ratings
- **Fast Shipping**: Quick delivery to your doorstep
- **Easy Returns**: Hassle-free return policy


## Getting Started

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/kdp-group/shortnhat.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`


## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5, SASS
- **Build Tools**: Webpack, Babel
- **Version Control**: Git, GitHub
- **Performance**: Optimized assets for fast loading


## File Structure

```
shortnhat/
├── src/                    # Source files
│   ├── assets/            # Static assets
│   │   ├── css/          # Compiled CSS
│   │   ├── js/           # JavaScript files
│   │   └── images/       # Image assets
│   ├── html/             # HTML templates
│   └── partials/         # Reusable components
├── dist/                 # Production build
└── package.json          # Project configuration
```


## Contact Us

Have questions or need assistance? We'd love to hear from you!

- **Email**: support@shortandhat.com
- **Phone**: (555) 123-4567
- **Address**: 123 Fashion Street, Style City, 10001

Follow us on social media for the latest updates and promotions!

We use Handlebars for two main reasons: firstly, the use of Handlebars partials allows us to reference the same file in multiple HTML files and means that you only have to edit the code from a single source. If you're used to working with React or Vue, this would be the same as referencing a component. Secondly, the use of JSON data for our dummy catalogue data keeps our template code clean. We can easily output 10 dummy products on our listing page by outputting a basic Handlebars loop.

### Example Handlebars Partial
Open the following file in our template: src/html/index.html.

Around line 21 you'll see the following code:
```
{{> swiper/swiper-homepage-hero }}
```
That's a Handlebars partial. That code tells Handlebars to look inside a folder called swiper (located in the partials folder) and then to find a file called swiper-homepage-hero and insert it into the index.html file when it is compiled.

There are a few important notes about our use of Handlebars partials:

* All of our partials are stored inside src/partials. Do not place partials anywhere else.
* We use .html as our partial file extension. We have also added .svg as a valid partial file extension.
* If you have folders within folders inside your partial folder, only reference the folder the partial resides in. So "partials/header/navbars/navbar.html" would be referenced as "navbars/navbar".
* Do not include the partial file extension. Note in the example above that we output "swiper-homepage-hero" and not "swiper-homepage-hero.html"

### Handlebars Loops
Let's look at how we use Handlebars to keep our code base clean. Open up the category page: src/html/category.html. 

Around line 40, you will find this code:
```
{{#if (config category-products)}}
    {{#each category-products.entries}}
        <div class="col-12 col-sm-6 col-lg-4">
            {{> listing-cards/listing-card this }}
        </div>
    {{/each}}
{{/if}}
```
And that's our loop for a category page. We're passing in JSON data to our Handlebars loop, then inside the loop we are referencing a Handlebars partial and passing it the data for each loop item:
```
{{> listing-cards/listing-card-one this }}
```
## Template JSON Data
The Webpack Handlebars plugin that we use comes with a very handy utility that allows us to pass in JSON files as template data.

Please navigate to: src/data. Here is where our template data JSON files reside. You can edit, remove or add your own to this folder.

Again, if we reference our category page loop:

```
{{#if (config category-products)}}
    {{#each category-products.entries}}
        <div class="col-12 col-sm-6 col-lg-4">
            {{> listing-cards/listing-card this }}
        </div>
    {{/each}}
{{/if}}
```

The important part here with regards to template data is category-products.entries. What this means is that inside our data folder you will find a JSON file called "category-products". This category-products.json file has a "key" called "entries".



## Customise Template Styles
All of the template's source CSS/SASS files are kept inside the template's assets folder. Navigate to src/assets/scss. Open up theme.scss with your editor.

This is the main entry point for all other SASS/CSS files.


## Create New Pages
To create a new page, navigate in your code editor to: src/html. To make it easier to get the correct HTML in place, clone an existing page. Rename the newly-created file to whatever URL you require. And that's it. You are now free to open the new page with your code editor, make your changes, and then save the file. Quit Webpack devserver and restart it for the page to show up.


## Join Our Community

Be the first to know about new arrivals, exclusive offers, and style tips. Sign up for our newsletter today and receive 10% off your first order!

## Quality Guarantee

At Short and Hat, we stand behind the quality of our products. If you're not completely satisfied with your purchase, we offer a 30-day return policy. Our customer service team is always ready to assist you with any questions or concerns.

## Sustainability

We're committed to sustainable fashion practices. Our products are made with eco-friendly materials and ethical manufacturing processes. Join us in making a positive impact on the environment while looking your best.

## Bootstrap Documentation
Bootstrap already has a comprehensive documentation site that will guide you in setting up and using all default Bootstrap features. Bootstrap 5 is fully integrated to our template's source code. Please refer to Bootstrap's doc site first for any default Bootstrap features: [Visit Bootstrap's Doc Site](https://getbootstrap.com/docs/5.0/getting-started/introduction/)


## Credits
[Bootstrap](https://getbootstrap.com/)

[AOS.js](https://michalsnik.github.io/aos/)

[Unsplash](https://unsplash.com/)

[Pexels](https://www.pexels.com/)

[Pixabay](https://pixabay.com/)

[MediumZoom.js](https://github.com/francoischalifour/medium-zoom)

[NoUiSlider.js](https://refreshless.com/nouislider/)

[Simplebar.js](https://github.com/Grsmto/simplebar)

[Swiper.js](https://swiperjs.com/)

## Contact Us
You can find our website [here](https://www.pixelrocket.store) or you can email us at support@pixelrocket.store
