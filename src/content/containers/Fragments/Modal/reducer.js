import _ from 'lodash';

import {
  MODAL_OPEN,
  MODAL_CLOSE,

  // modalSizeSmall,
  modalSizeMedium,
  // modalSizeLarge,
} from './action';

export const initialState = {
  open: false,
  components: {
    header: null,
    body: null,
    footer: null,
  },
  size: modalSizeMedium,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return _.assign({}, state, {
        open: true,
        components: action.components,
        size: action.size,
      });
    case MODAL_CLOSE:
      return _.assign({}, state, { open: false });
    default:
      return state;
  }
};
