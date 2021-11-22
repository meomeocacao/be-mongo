// find max value in array
export const max = (arr: number[]) => {
  return arr.reduce((a, b) => (a > b ? a : b));
};
// find average value in array
export const average = (arr: number[]) => {
  return arr.reduce((a, b) => a + b) / arr.length;
};
// find min value in array
export const min = (arr: number[]) => {
  return arr.reduce((a, b) => (a < b ? a : b));
};
// find median value in array
export const median = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// draw a circle
export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

// get current window size
export const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

//Change to utc time
export const getUTCTime = (time: number) => {
  return new Date(time).toUTCString();
};
