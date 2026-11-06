import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('nominal geometry reference', () => {
  const t = api.parseTire('205/55R16');
  assert.equal(t.sidewallMm, 112.75);
  assert.equal(t.diameterMm, 631.9);
});
test('circumference', () => {
  assert.equal(api.parseTire('205/55R16').circumferenceMm, 631.9 * Math.PI);
});
test('identity comparison', () => {
  assert.deepEqual(api.compareTires('205/55R16', '205/55R16'), {
    diameterChangePercent: 0,
    indicatedToActualRatio: 1,
  });
});
test('canonical notation rejection', () => {
  for (const t of ['205/55r16', '0205/55R16', '205/55R16 91V', '205/55R16\n', '205-55R16'])
    assert.throws(() => api.parseTire(t));
});
test('nominal dimension bounds', () => {
  assert.throws(() => api.parseTire('99/55R16'));
  assert.throws(() => api.parseTire('205/19R16'));
  assert.throws(() => api.parseTire('205/55R31'));
});
test('size ratio oracle', () => {
  const a = api.parseTire('205/55R16'),
    b = api.parseTire('225/45R17'),
    r = api.compareTires('205/55R16', '225/45R17');
  assert.ok(
    Math.abs(
      r.indicatedToActualRatio - (17 * 25.4 + 2 * 225 * 0.45) / (16 * 25.4 + 2 * 205 * 0.55),
    ) < 1e-12,
  );
  assert.ok(Math.abs(a.circumferenceMm * r.indicatedToActualRatio - b.circumferenceMm) < 1e-10);
});
