const mostFreqStr = (array: string[]) => {
  const obj = {};

  array.forEach((ea) => {
    //@ts-ignore
    if (!obj[ea]) {
      //@ts-ignore
      obj[ea] = 1;
    } else {
      //@ts-ignore
      obj[ea]++;
    }
  });

  return Object.entries(obj)
    .sort((a: [string, any], b: [string, any]) => b[1] - a[1])
    .flat()
    .filter((key) => typeof key === "string");
};

export default mostFreqStr;
