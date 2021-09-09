import { required, length } from 'redux-form-validators';

import { ERRORS_FORM } from '../constants/errors';

export const VALIDATION = {
  required: required({ message: ERRORS_FORM.required }),
  minLength: (min) => length({ min, message: ERRORS_FORM.minLength(min) })
};
