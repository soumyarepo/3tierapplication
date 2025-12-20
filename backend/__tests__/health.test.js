test('health check', () => {
  expect(true).toBe(true);
});
const request = require('supertest');
const app = require('../src/index');

describe('Health endpoint', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Banking Backend Running');
  });
});

