// Import custom styles ✨
import '../css/main.scss';
import '../css/utilities.scss';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Webpack is working fine! 🚀');
});

// 👇 Your custom scripts here 👇
import { modalHandler } from '../js/utils/modals';
import { carouselHandler } from './utils/carousel';
modalHandler();
carouselHandler();

// ⛔ DON'T DELETE NEXT LINES!
// Accept HMR as per: https://webpack.js.org/api/hot-module-replacement#accept
if (module.hot) {
  module.hot.accept();
}
