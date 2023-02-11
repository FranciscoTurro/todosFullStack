export const formatDate = (givenDate: string | Date) => {
  const date = new Date(givenDate.toString());

  const formattedDate = date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
    .toString();

  return formattedDate;
};
