const request= require('supertest');
const server=require('./server.js');

describe('GET /',() => {
    it('should return 401 unauthorized',async() => {
        const res= await request (server).get('/api/jokes');
        expect (res.status).toBe(401);
    })

}) 

describe('GET /',() => {
    //test for status code
    it('should return 200 ok',  async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    })

    //test for format
    it('should return a json object', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    })

     
    // test for json body structure
    
    it('should return It is alive', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual('It is working!');
    })
})


