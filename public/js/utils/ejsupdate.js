export const updateTemplate = (markup, data) => {
  const updatedTemplate = ejs.render(markup, data);
  return updatedTemplate;
}