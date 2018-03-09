export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const modalSizeSmall = 'modalSizeSmall';
export const modalSizeMedium = 'modalSizeMedium';
export const modalSizeLarge = 'modalSizeLarge';
export const modalSizeHuge = 'modalSizeHuge';

export const doModalOpen = (modalComponents, modalSize = modalSizeMedium) =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: MODAL_OPEN,
      components: modalComponents,
      size: modalSize,
    });
  };

export const doModalClose = () =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({ type: MODAL_CLOSE });
  };
