import { menuArray } from "./data.js";

const itemsHTML = document.getElementById("menu-items");
const orderListHTML = document.getElementById("order-list");
const orderSuccessMessage = document.getElementById("order-success-message");
const orderSuccessName = document.getElementById("order-success-name");
// Track order items (we can use id to look up name/price from menuArray)
const orderItems = [];

function render() {
  let itemsContent = ``;
  menuArray.forEach((item) => {
    const { name, ingredients, id, price, emoji } = item;
    itemsContent += `
        <div class="menu-item">
            <p class="item-emoji">${emoji}</p>
            <div class="menu-item-details">
               <h3>${name}</h3>
               <p>${ingredients}</p>
               <p>$${price}</p>
            </div>
            <button class="add-item-btn" data-item-id="${id}" aria-label="Add ${name}"><i class="fa-solid fa-plus"></i></button>
        </div>`;
  });
  itemsHTML.innerHTML = itemsContent;
}

function getOrderTotal() {
  return orderItems.reduce((sum, id) => {
    const item = menuArray.find((i) => i.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
}

function renderOrderList() {
  if (orderItems.length === 0) {
    orderListHTML.innerHTML = "";
    return;
  }
  const total = getOrderTotal();
  orderListHTML.innerHTML = `<h2>Your Order</h2>`;
  orderListHTML.innerHTML += orderItems
    .map((id, index) => {
      const item = menuArray.find((i) => i.id === id);
      return `<div class="order-item">
        <span class="order-item-name">${item.name} <button class="remove-item-btn" data-order-index="${index}" aria-label="Remove ${item.name}">remove</button></span>
        <span>$${item.price}</span>
      </div>`;
    })
    .join("");
  orderListHTML.innerHTML += `
    <div class="order-footer">
      <div class="order-footer-inner">
        <div class="order-separator"></div>
        <div class="order-total-row">
          <span>Total price</span>
          <span>$${total}</span>
        </div>
        <button type="button" id="payment-btn" class="payment-btn">Complete order</button>
      </div>
    </div>`;
}

function addItemToOrder(e) {
  const btn = e.target.closest(".add-item-btn");
  if (!btn) return;

  orderSuccessMessage.hidden = true;
  const itemId = parseInt(btn.dataset.itemId, 10);
  orderItems.push(itemId);
  renderOrderList();
}

function removeItemFromOrder(e) {
  const btn = e.target.closest(".remove-item-btn");
  if (!btn) return;

  const index = parseInt(btn.dataset.orderIndex, 10);
  orderItems.splice(index, 1);
  renderOrderList();
}

const paymentModal = document.getElementById("payment-modal");
const paymentForm = document.getElementById("payment-form");

function openPaymentModal() {
  paymentModal.classList.remove("payment-modal-hidden");
  paymentModal.setAttribute("aria-hidden", "false");
}

function closePaymentModal() {
  paymentModal.classList.add("payment-modal-hidden");
  paymentModal.setAttribute("aria-hidden", "true");
}

function handleOrderListClick(e) {
  const removeBtn = e.target.closest(".remove-item-btn");
  if (removeBtn) {
    removeItemFromOrder(e);
    return;
  }
  const paymentBtn = e.target.closest("#payment-btn");
  if (paymentBtn) {
    openPaymentModal();
  }
}

paymentModal
  .querySelector(".payment-modal-backdrop")
  .addEventListener("click", closePaymentModal);

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(paymentForm);
  const name = formData.get("name") || "Customer";
  orderItems.splice(0);
  renderOrderList();
  orderSuccessName.textContent = name;
  orderSuccessMessage.hidden = false;
  paymentForm.reset();
  closePaymentModal();
});

render();

itemsHTML.addEventListener("click", addItemToOrder);
orderListHTML.addEventListener("click", handleOrderListClick);
