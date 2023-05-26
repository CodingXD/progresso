const data = [] as string[];

export const addItem = (item: string) => {
  data.push(item);
};

export const listItem = () => {
  return data;
};
