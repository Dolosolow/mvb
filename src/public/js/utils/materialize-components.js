// --------------------
// Materializecss js configs
export default {
  init: {
    dropDowns: (elm) => $(elm).dropdown(),
    modals: (elm, options) => {
      const defaultOps = {
        startingTop: '-10%',
        endingTop: '10%',
        inDuration: 350,
        outDuration: 350
      };
      const customOps = Object.assign({}, defaultOps, options);
      return $(elm).modal(customOps);
    }
  }
}