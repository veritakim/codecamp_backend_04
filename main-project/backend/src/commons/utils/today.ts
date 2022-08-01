export const Today = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1);
  const dd = date.getDate();

  const today = `${yyyy}${mm.padStart(2, '0')}${dd}`;
  return today;
};
