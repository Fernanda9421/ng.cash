export const convertDate = (date:string) => {
  return date.split('-').reverse().join('/');
};
