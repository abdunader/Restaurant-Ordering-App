import { menuArray } from "./data.js";

const itemsHTML = document.getElementById("menu-items");
const orderListHTML = document.getElementById("order-list");
const orderSuccessMessage = document.getElementById("order-success-message");
const orderSuccessName = document.getElementById("order-success-name");
const orderItems = [];

function render() {
  let itemsContent = ``;
  menuArray.forEach((item) => {
    const { name, ingredients, id, price, emoji } = item;
    const minPrice = Math.min(...price);
    itemsContent += `
        <div class="menu-item">
            <p class="item-emoji">${emoji}</p>
            <div class="menu-item-details">
               <h3>${name}</h3>
               <p>${ingredients}</p>
               <p>From $${minPrice}</p>
            </div>
            <button class="add-item-btn" data-item-id="${id}" aria-label="Add ${name}"><i class="fa-solid fa-plus"></i></button>
        </div>`;
  });
  itemsHTML.innerHTML = itemsContent;
}

function getOrderTotal() {
  return orderItems.reduce((sum, entry) => {
    const item = menuArray.find((i) => i.id === entry.itemId);
    if (!item) return sum;
    const price = item.price[entry.sizeIndex ?? 0];
    return sum + price;
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
    .map((entry, index) => {
      const item = menuArray.find((i) => i.id === entry.itemId);
      const sizeIndex = entry.sizeIndex ?? 0;
      const price = item.price[sizeIndex];
      const sizeOptions = item.sizes
        .map(
          (label, i) =>
            `<option value="${i}" ${i === sizeIndex ? "selected" : ""}>${label}</option>`
        )
        .join("");
      return `<div class="order-item" data-order-index="${index}">
        <span class="order-item-name">${item.name} <button class="remove-item-btn" data-order-index="${index}" aria-label="Remove ${item.name}">remove</button></span>
        <span class="order-item-size-price">
          <select class="order-size-select" data-order-index="${index}" aria-label="Size for ${item.name}">
            ${sizeOptions}
          </select>
          <span class="order-item-price">$${price}</span>
        </span>
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
  orderItems.push({ itemId, sizeIndex: 0 });
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

function handleOrderSizeChange(e) {
  const select = e.target.closest(".order-size-select");
  if (!select) return;
  const index = parseInt(select.dataset.orderIndex, 10);
  const sizeIndex = parseInt(select.value, 10);
  orderItems[index].sizeIndex = sizeIndex;
  renderOrderList();
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
orderListHTML.addEventListener("change", handleOrderSizeChange);
