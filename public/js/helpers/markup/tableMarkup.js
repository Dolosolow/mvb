const noneCurrentlyPlaying = `
<div class="no-results-msg text-center mt-xs" id="no-results-msg">
  <h4>No movies currently playing</h4>
</div>
`;

const tablesawTable = (isEditable) => {
  return `
  <table
  class="data-tablesaw ${isEditable && 'data-tablesaw--editable'} tablesaw tablesaw-stack tablesaw-sortable mb-sm"
  id="now-playing-table"
  data-tablesaw-sortable
  data-tablesaw-sortable-switch
  >
    <thead>
      <tr>
        <th
          scope="col"
          data-tablesaw-sortable-col
          data-tablesaw-priority="persist"
          data-tablesaw-sortable-numeric="false"
        >
          Movie Title
        </th>
        <th
          scope="col"
          data-tablesaw-sortable-col
          data-tablesaw-priority="persist"
          data-tablesaw-sortable-numeric
        >
          Theater
        </th>
        <th
          scope="col"
          data-tablesaw-sortable-col
          data-tablesaw-priority="persist"
          data-tablesaw-sortable-numeric
        >
          Date
        </th>
        <th
        scope="col"
        data-tablesaw-sortable-col
        data-tablesaw-priority="persist"
        data-tablesaw-sortable-numeric
      >
        Start Time
      </th>
        <th
          scope="col"
          data-tablesaw-sortable-col
          data-tablesaw-priority="persist"
          data-tablesaw-sortable-numeric
        >
          Seats Avl
        </th>
      </tr>
    </thead>
    <tbody>
      <% for(let movie of movies) { %>
        <% for(let screen of screens) { %>
          <tr id="mov-row" ${isEditable && 'data-remove-icon=\"&#xf2ed;\" data-id=\"<%= movie.id %>\"'}>
            <% if(screen.movieId === movie.id) { %>
              <td class="title"><%= movie.title %></td>
              <td class="theater-screen"><%= screen.screenRoom %></td>
              <td class="strt-date"><%= screen.date %></td>
              <td class="strt-date"><%= screen.startTime %>p</td>
              <td class="seat-avl"><%= screen.avl %></td>
            <% } %>
            </tr>
        <% } %>
      <% } %>
    </tbody>
  </table>
  `
}

export {
  noneCurrentlyPlaying,
  tablesawTable
}