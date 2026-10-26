import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pino} from 'pino';
import {payloadLoggerConfig} from '../src/lib/payload-logger';

test('production warnings and full error stacks each occupy one JSON log line', () => {
  const lines: string[] = [];
  const config = payloadLoggerConfig(true, false)!;
  const logger = pino(config.options, {write(line: string) {lines.push(line);}});
  logger.info('routine request');
  logger.warn('warning retained');
  const error = new Error('test database failure');
  logger.error({err: error}, 'request failed');
  assert.equal(lines.length, 2);
  for (const line of lines) assert.equal(line.trim().split('\n').length, 1);
  assert.equal(JSON.parse(lines[0]).msg, 'warning retained');
  assert.equal(JSON.parse(lines[1]).err.message, error.message);
  assert(JSON.parse(lines[1]).err.stack.includes('payload-logger.test.ts'));
});

test('local development and migration CLI retain their normal logger', () => {
  assert.equal(payloadLoggerConfig(false, false), undefined);
  assert.equal(payloadLoggerConfig(true, true), undefined);
});
