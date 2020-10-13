// --------------------
// for when updating frontend after an async api call or when a value 
// on screen needs to be changed without a hard refresh.
export default function updateEJStemplate(markup, data) {
  const updatedTemplate = ejs.render(markup, data);
  return updatedTemplate;
}