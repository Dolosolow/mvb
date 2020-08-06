const cartList = () => (
  `
    <ul class="seat-selection__cart-mycart" id="cart">
    <% for(let item of cartItems) { %>
      <li class="mycart__item">
        <div class="seat-wrapper">
          <div class="<%= item.seat_type %>"></div>
        </div>
        <span class="seat-id"><%= item.id.split('-').join('/') %></span>
        <span class="seat-price">$<%= Number(item.unit_price * item.qty).toFixed(2) %></span>
        <span class="btn-remove-item">&times;</span>
      </li>
    <% } %>
    </ul>
  `
)

module.exports = {
  cartList
};