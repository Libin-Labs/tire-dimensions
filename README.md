# @lp-labs/tire-dimensions

Strict metric tire notation and nominal size comparison.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/tire-dimensions
```

## Working example

```js
import { parseTire } from '@lp-labs/tire-dimensions';
if (parseTire('205/55R16').diameterMm !== 631.9) throw new Error('Tire');
```

CommonJS: `const api = require('@lp-labs/tire-dimensions')`.

## Behavior, customization and limits

parseTire accepts canonical width/aspectRrim e.g.205/55R16 (integers, uppercase R, no spaces/speed/load/suffixes). Width100..500mm, aspect20..100%, rim8..30in. Returns widthMm,aspectPercent,rimInches,sidewallMm,diameterMm,circumferenceMm. compareTires returns diameterChangePercent and indicatedToActualRatio=proposed/current diameter. Nominal geometry only, no fitment, load, road legality or installation advice. O(text), <=12 chars.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface TireDimensions {
  widthMm: number;
  aspectPercent: number;
  rimInches: number;
  sidewallMm: number;
  diameterMm: number;
  circumferenceMm: number;
}
export declare function parseTire(notation: string): TireDimensions;
export declare function compareTires(
  current: string,
  proposed: string,
): {
  diameterChangePercent: number;
  indicatedToActualRatio: number;
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
