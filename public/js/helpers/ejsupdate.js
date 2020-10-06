const updateEJStemplate = (markup, data) => {
  const updatedTemplate = ejs.render(markup, data);
  return updatedTemplate;
}

module.exports = updateEJStemplate;