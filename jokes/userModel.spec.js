const request= require('supertest');
const server=require('../api/server.js');

describe('GET /',() => {
    it('should return 401 unauthorized',async() => {
        const res= await request (server).get('/api/jokes');
        expect (res.status).toBe(401);
    })

}) 