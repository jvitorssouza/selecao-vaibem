export const documentMask = (value: string = ''): string => {
  let x = value
    .replace(/\D/g, '')
    .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);

  if (x) {
    value = !x[2]
      ? x[1]
      : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
  }

  return value;
};

export const zipCodeMask = (value: string = '') => {
  let x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);

  if (x) {
    value = !x[2] ? x[1] : x[1] + '-' + x[2];
  }

  return value;
};

export const phoneNumberMask = (value: string = '') => {
  let x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

  if (x) {
    value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}-${x[3]}`;
  }

  return value;
};

export const unmask = (value: string = '') => {
  let x = value.replace(/\D/g, '');
  return x;
};
