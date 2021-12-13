export const modalHandler = () => {
  function findSpecificParentNode(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  const modalButtons = document.querySelectorAll('.js-modal-button');

  const openModal = modalButtons => {
    modalButtons.forEach(modalButton => {
      modalButton.addEventListener('click', () => {
        const modalButtonID = modalButton.getAttribute('modal-button-id');
        const modalContainer = document.querySelector(
          `[modal-id="${modalButtonID}"]`,
        );

        modalContainer.classList.add('show');
      });
    });
  };
  const closeModal = e => {
    const modalContainer = findSpecificParentNode(
      e.target,
      'js-modal-container',
    );
    modalContainer.classList.remove('show');
  };
  //Open Modal
  openModal(modalButtons);

  //Close Modals
  document.addEventListener('click', e => {
    if (e.target.classList.contains('js-btn-close')) {
      closeModal(e);
    }
  });
};
