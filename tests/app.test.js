const request = require('supertest');
const app = require('../server'); // 確保路徑正確且 app 被正確 export

describe('GET /api', () => {
  it('should return status 200 and a welcome message', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'API is running');
  });
});
