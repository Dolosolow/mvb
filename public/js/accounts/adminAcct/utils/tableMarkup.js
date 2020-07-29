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
      <% for(let movie of currentlyPlaying) { %>
        <tr id="mov-row" ${isEditable && 'data-remove-icon=\"&#xf2ed;\" data-id=\"<%= movie.id %>\"'}>
          <td class="title"><%= movie.title %></td>
          <td class="theater-screen"><%= movie.theater %></td>
          <td class="strt-date">06:15p</td>
          <td class="end-date">0/22</td>
        </tr>
      <% } %>
    </tbody>
  </table>
  `
}

export {
  noneCurrentlyPlaying,
  tablesawTable
}