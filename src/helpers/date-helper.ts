export const getFormattedProfileDate = (date: Date | string) => {
  const givenDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = givenDate.toLocaleString('en-GB', options);

  return formattedDate;
};
