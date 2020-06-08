export const displayTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let time = '';
  if (hrs > 0) {
    time += `${hrs}:${mins < 10 ? '0' : ''}`;
  }

  time += `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  return time;
};

export const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
