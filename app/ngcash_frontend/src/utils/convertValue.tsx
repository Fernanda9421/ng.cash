export const convertValue = (value:number) => {
  return parseFloat(value.toString()).toFixed(2).replace('.', ',');
};
