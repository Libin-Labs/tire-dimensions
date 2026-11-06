function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export interface TireDimensions {
  widthMm: number;
  aspectPercent: number;
  rimInches: number;
  sidewallMm: number;
  diameterMm: number;
  circumferenceMm: number;
}
export function parseTire(notation: string): TireDimensions {
  strictText(notation, 12);
  if (/[^0-9/R]/.test(notation)) throw new RangeError('Invalid notation');
  const m = /^([1-9][0-9]*)\/([1-9][0-9]*)R([1-9][0-9]*)$/.exec(notation);
  if (!m) throw new RangeError('Expected width/aspectRrim');
  const widthMm = integer(Number(m[1]), 100, 500),
    aspectPercent = integer(Number(m[2]), 20, 100),
    rimInches = integer(Number(m[3]), 8, 30),
    sidewallMm = (widthMm * aspectPercent) / 100,
    diameterMm = rimInches * 25.4 + 2 * sidewallMm;
  return {
    widthMm,
    aspectPercent,
    rimInches,
    sidewallMm,
    diameterMm,
    circumferenceMm: diameterMm * Math.PI,
  };
}
export function compareTires(
  current: string,
  proposed: string,
): { diameterChangePercent: number; indicatedToActualRatio: number } {
  const a = parseTire(current),
    b = parseTire(proposed),
    ratio = b.diameterMm / a.diameterMm;
  return { diameterChangePercent: (ratio - 1) * 100, indicatedToActualRatio: ratio };
}
