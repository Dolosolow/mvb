<<<<<<< HEAD
=======
// --------------------
// for when updating frontend after an async api call or when a value 
// on screen needs to be changed without a hard refresh.
>>>>>>> master
const updateEJStemplate = (markup, data) => {
  const updatedTemplate = ejs.render(markup, data);
  return updatedTemplate;
}

module.exports = updateEJStemplate;