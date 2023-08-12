export const timeDifference = (current: any, previous: any) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;

  if (elapsed < msPerMinute / 59) {
    return 'just now';
  }
  else if (elapsed < msPerMinute) {
    return getDifferenceOutput(Math.round(elapsed / 1000), "second");
  }
  else if (elapsed < msPerHour) {
    return getDifferenceOutput(Math.round(elapsed / msPerMinute), "minute");
  }
  else if (elapsed < msPerDay) {
    return getDifferenceOutput(Math.round(elapsed / msPerHour), "hour");
  }
  else if (elapsed < msPerMonth) {
    return getDifferenceOutput(Math.round(elapsed / msPerDay), "day");
  }
  else if (elapsed < msPerYear) {
    return getDifferenceOutput(Math.round(elapsed / msPerMonth), "month");
  }
  else {
    return getDifferenceOutput(Math.round(elapsed / msPerYear), "year");
  }
}

const getDifferenceOutput = (diff: number, unit: string) => {
  return `${diff} ${unit}${diff !== 1 ? 's' : '' } ago`;
};
