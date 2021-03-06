/* eslint-disable import/prefer-default-export */
export const constructError = (error) => {
  console.log('ERROR: ', error);
  console.log('ERROR.response', error.response);

  if (error.response) {
    if (error.response.data.errors) {
      return error.response.data.errors[0];
    }
    return {
      title: error.response.data.error,
      detail: error.response.data.exception,
    };
  }
  return {
    detail: error.message,
  };
};
