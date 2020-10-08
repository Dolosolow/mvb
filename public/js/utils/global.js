export const hasAttribute = (el) => {
  if(typeof el === typeof undefined || el === false) {
    return false;
  }
  return true;
}

export const toggleQuickTipImg = selector => {
  if($(`${selector}`).hasClass('scale-in-right')) {

    $(`${selector}`).removeClass('scale-in-right');
    $(`${selector}`).addClass('scale-out-right');
  } else {
    $(`${selector}`).removeClass('scale-out-right');
    $(`${selector}`).addClass('scale-in-right');
  }
}