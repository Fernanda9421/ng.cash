interface Value {
  token: string;
  username: string;
  id: number;
}

export const storageSetItem = (key:string, value:Value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const storageGetItem = (key:string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item !== null) return JSON.parse(item);
  }
};
