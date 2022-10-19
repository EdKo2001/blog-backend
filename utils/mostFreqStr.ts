const mostFreqStr = (array: string[]) => {
  const obj = {};
  let mostFreq = 0,
    which: string[] = [];

  array.forEach((ea) => {
    //@ts-ignore
    if (!obj[ea]) {
      //@ts-ignore
      obj[ea] = 1;
    } else {
      //@ts-ignore
      obj[ea]++;
    }
    //@ts-ignore
    if (obj[ea] > mostFreq) {
      //@ts-ignore
      mostFreq = obj[ea];
      which = [ea];
      //@ts-ignore
    } else if (obj[ea] === mostFreq) {
      which.push(ea);
    }
  });

  // console.log("which", which);

  return which;
};

export default mostFreqStr;
