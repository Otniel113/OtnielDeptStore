# Serif POS Frontend Context

This document provides technical context and specifications for the "Serif POS" (Point of Sale) cashier application. This project is currently built with vanilla HTML/JS and is ready to be migrated to modern frameworks like **React + Vite**.

## 1. Project Overview
- **Name:** Serif POS
- **Purpose:** A high-contrast, elegant, and accessible Point of Sale system.
- **Project Structure:**
    - `guest.html`: Public-facing menu catalog for browsing.
    - `login.html`: Authentication entry point (Username/Email & Password).
    - `register.html`: User onboarding (Email, Username, Password, Confirm).
    - `member-home.html`: Authenticated member view. Includes:
        - Product categories and menu browsing.
        - Detailed category header/description.
        - Shopping cart and checkout system.
        - Transaction history modal.
    - `admin.html`: Inventory and administrative dashboard (CRUD for Products & Categories).

## 2. Design System & Theming
- **Background (Cream):** `#FBF3D1`
- **Foreground (Black):** `#0F0F0F`
- **Gold Accent:** `#D4AF37` (Darker Gold for hover: `#B4941F`)
- **Typography:**
    - `Playfair Display` (Serif): Used for brand headers and primary headings.
    - `Source Sans 3` (Sans): Used for readable content.
    - `IBM Plex Mono` (Mono): Used for codes (Order ID, product IDs), prices, and uppercase tracking caps.
- **Tailwind Extension:**
    - `gold` palette (start/end/dark).
    - Custom letter spacing: `editorial` (0.01em), `caps` (0.15em).
    - Shadow variants: `card` and `elevated`.

## 3. Core Logic & Data
### Current State (In-Memory JS)
- **Categories:** Currently includes `all`, `coffee`, `bakery`, `tea`. Each has a `label` and `description`.
- **Products:** Each has `id`, `name`, `category`, `price`, and `stock`.
- **Cart:** Managed as a local array. Handles quantity updates and inventory constraints.
- **Transaction History:** Managed in `member-home.html` through a variable `transactionHistory`. Items are added upon `APPROVED` payment status.
- **Inventory/Stock Management:**
    - Stock decreases locally when `processPayment()` is executed.
    - If `stock == 0`, products show as "SOLD OUT" (with a diagonal line and pattern).

## 4. Key Functions to Migrate
- `renderProducts()` / `renderFilters()`: Should become React components based on state.
- `addToCart(productId)`: Needs state management (`useState` or `useReducer`).
- `setCategory(id)`: Should trigger category filtering and description rendering.
- `renderDescription()`: New feature that shows the header/description for the active category.
- `processPayment()`: Currently includes a mock delay. Will need to be replaced with a real API call.

## 5. Migration Strategy (Next Steps)
1. **Initialize React + Vite project.**
2. **Setup Tailwind CSS configuration** using the provided theme extension colors and fonts.
3. **Componentize Layouts:** 
    - `Header`, `Sidebar`, `Modal`, `ProductCard`, `CartItem`.
4. **State Management:** Implement `CartContext` or similar for global cart/order access.
5. **Backend Integration:** Replace the static `products`, `categories`, and `transactionHistory` with data fetched from an API.

## 6. Access & User Flow
- **Guest:** Browses products; no cart interaction; Prompted to Login/Register.
- **Member:** Can add to cart, checkout, view history.
- **Admin:** Separate dashboard with CRUD capability.
- **Routing:** Currently using file-based `<a>` links. Needs `react-router-dom` implementation.
