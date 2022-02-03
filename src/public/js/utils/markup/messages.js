export function errorMessage() {
  return `
    <div class="alert-error" role="alert">{msg}</div>
  `
};

export function successMessage(msg) {
  return `
    <div class="modal modal-msg" id="modal-msg">
      <button class="btn-worded-only modal-close">&times;</button>
      <div class="modal-content">
        <h2>Confirmation</h2>
        <p>${msg}</p>
      </div>
    </div>
  `;
}