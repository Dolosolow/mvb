export function cartItemList() {
  return `
    <ul class="mycart__list" id="mycart__list">
      <% for(let item of cartItems) { %>
        <li class="mycart__item" data-id="<%= item.id %>">
          <div class="seat-wrapper">
            <div class="<%= item.seat_type %>"></div>
          </div>
          <span class="seat-id"><%= item.id.split('-').join('/') %></span>
          <span class="seat-price">$<%= Number(item.unit_price * item.qty).toFixed(2) %></span>
          <span class="btn-remove-item" id="remove-cart-btn">&times;</span>
        </li>
      <% } %>
    </ul>
  `;
}