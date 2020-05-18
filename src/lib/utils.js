/* eslint-disable import/prefer-default-export */
export const createCountFormatter = ({
  few,
  one,
  two,
}) => {
  const titles = [one, two, few];

  return (number) => {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };
};

export const dateTimeFormatter = (date) => (`${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)} | ${(`0${date.getDate()}`).slice(-2)}/${(`0${date.getMonth() + 1}`).slice(-2)}/${date.getFullYear()}`);

export const dateFormatter = (date) => (`${(`0${date.getDate()}`).slice(-2)}/${(`0${date.getMonth() + 1}`).slice(-2)}/${date.getFullYear()}`);
