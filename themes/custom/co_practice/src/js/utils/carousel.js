export const carouselHandler = () => {
  $(document).ready(function () {
    $('.js-carousel').slick({
      slidesToShow: 1,
      // dots: true,
      centerMode: true,
      variableWidth: true,
    });
  });
};
