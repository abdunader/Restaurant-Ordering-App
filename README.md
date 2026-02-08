# Jimmy's Diner — Restaurant Ordering App

A single-page restaurant ordering app where users can browse the menu, add and remove items, see a live total, and complete payment with a simple card-details form. Built with vanilla JavaScript (ES modules), HTML, and CSS.

---

## Features

- **Menu** — Displays items (name, ingredients, price, emoji) with an “Add” button per item.
- **Order list** — Items appear in “Your Order” with name and price; each row has a “remove” link to drop that item.
- **Live total** — A fixed footer shows a separator, total price, and a “Complete order” button at the bottom of the screen.
- **Payment modal** — Clicking “Complete order” opens a popup form for:
  - Name
  - Card number
  - CVV  
    and a “Pay” button. Submitting clears the order and resets the form.
- **Order confirmation** — After paying, a success message appears under the menu: _“Thanks, [Name]! Your order is on its way!”_ (light green banner). The message hides when the user adds a new item to the cart.

---

## Tech Stack

| Layer  | Technology                          |
| ------ | ----------------------------------- |
| Markup | HTML5                               |
| Style  | CSS3 (Flexbox, fixed footer, modal) |
| Logic  | Vanilla JavaScript (ES6 modules)    |
| Fonts  | Google Fonts (Smythe, Roboto)       |
| Icons  | Font Awesome 6                      |

No frameworks, build step, or backend — runs in the browser with a static file server or by opening `index.html` (with module support).

---

## Project Structure

```
Restaurant Ordering app/
├── index.html      # Entry point, layout, payment modal markup
├── index.css       # Global and component styles
├── index.js        # App logic: menu render, order state, payment flow
├── data.js         # Menu data (exported menuArray)
├── assets/
│   └── header.jpg  # Header background image
└── README.md       # This file
```

- **`data.js`** — Exports `menuArray`: array of `{ name, ingredients, id, price, emoji }` for each menu item.
- **`index.js`** — Renders the menu from `menuArray`, manages `orderItems` (array of item ids), renders the order list and fixed footer, and handles add/remove, “Complete order”, and payment form submit (clear order, show success message, reset form).
- **`index.html`** — Contains the header, main (menu + success message + order list), and the payment modal (backdrop + form).

---

## Usage Summary

1. **Add items** — Click the plus button next to a menu item; it appears in “Your Order” with its price.
2. **Remove items** — Click “remove” next to an item in the order list.
3. **Complete order** — Click “Complete order” in the fixed footer to open the payment modal.
4. **Pay** — Enter name, card number, and CVV, then click “Pay”. The order is cleared, the form is reset, and the confirmation message appears under the menu. Adding a new item hides the message.

---

## License

This project is for portfolio/learning purposes. Use and modify as you like.
