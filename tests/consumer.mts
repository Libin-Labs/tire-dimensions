import { parseTire } from '@lp-labs/tire-dimensions';
if (parseTire('205/55R16').diameterMm !== 631.9) throw new Error('Tire');
// @ts-expect-error invalid argument must be rejected by declarations
parseTire(205);
