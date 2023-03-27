const scrollHandler = (event) => {
  event.preventDefault();
  window.scrollTo(lastX, lastY)
  return false;
};

const scrollOptions = { passive: false };

let lastX = 0;
let lastY = 0;

export function enableScrolling() {
  window.removeEventListener('wheel', scrollHandler, scrollOptions);
  window.removeEventListener('scroll', scrollHandler, scrollOptions);
  window.removeEventListener('DOMMouseScroll', scrollHandler, scrollOptions);
}

export function disableScrolling() {
  lastX = Math.round(window.scrollX);
  lastY = Math.round(window.scrollY);
  window.addEventListener('wheel', scrollHandler, scrollOptions);
  window.addEventListener('scroll', scrollHandler, scrollOptions);
  window.addEventListener('DOMMouseScroll', scrollHandler, scrollOptions);
}
