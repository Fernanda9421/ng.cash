interface Value {
  token: string;
  username: string;
}

export const storageSetItem = (key:string, value:Value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
