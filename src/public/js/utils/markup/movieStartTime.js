export function movieStartTime() {
  return `
    <div class="screen-avl__times-list" id="screen-avl__times-list">
      <i class="fas fa-angle-left text-red"></i>
      <% for(let startTime of times) { %>
        <p class="time<%= times[0].screenId === startTime.screenId ? ' active' : ''  %>" data-id="<%= startTime.screenId %>" ><%= startTime.time %></p>
      <% } %> 
      <i class="fas fa-angle-right text-red"></i>
    </div>
  `;
}