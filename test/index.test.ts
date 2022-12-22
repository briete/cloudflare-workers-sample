import app from '../src';

describe('Test the application', () => {
  it('Shoud return 200 response', async () => {
    const res = await app.request('http://localhost/');
    expect(res.status).toBe(200);
  });
});
