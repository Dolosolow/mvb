const movieStartTime = () => {
  return `
    <div class="screen-avl__times-list" id="screen-avl__times-list">
      <i class="fas fa-angle-left text-red"></i>
      <% for(let startTime of times) { %>
        <p class="time<%= times[0].id === startTime.id ? ' active' : ''  %>" data-id="<%= startTime.id %>" ><%= startTime.time %></p>
      <% } %> 
      <i class="fas fa-angle-right text-red"></i>
    </div>
  `
};

module.exports = {
  movieStartTime
}