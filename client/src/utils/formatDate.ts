export const formatDate = (givenDate: string | Date) => {
  const date = new Date(givenDate.toString());

  const formattedDate = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone: 'UTC',
    })
    .toString();

  return formattedDate;
};
