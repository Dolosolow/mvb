exports.hasAttribute = (el) => {
  if(typeof el === typeof undefined || el === false) {
    return false;
  }
  return true;
}