require('dotenv').config();
const fs = require('fs');
const pool = require('../utils/pool.js');
const Sewermonsters = require('../models/sewermonsters.js')
const request = require('supertest');
const app = require('../app')

describe("app routes", () => {

    let sewermonsters;
    beforeEach( async () => {
      await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
      sewermonsters = await Sewermonsters
      .insert({
        type: "Rat",
        cute: "0",
        ferocious: "You betcha"
        })
    });
  
    afterAll(() => {
      return pool.end();
    });



    test("POST sewermonsters", async () => {
        const post = {
            type: "Rat",
            cute: "1",
            ferocious: "man oh man, is it!"
        };
        const expectation = {
          id: "2",
          type: "Rat",
          cute: "1",
          ferocious: "man oh man, is it!"
       
        };
        const data = await request(app)
          .post("/sewermonsters")
          .send(post)
          .expect("Content-Type", /json/)
          .expect(200);
    
        expect(data.body).toEqual(expectation);
      });
    
      test("GET all sewermonsters", async () => {
        const expectation = 
        [
            {
                id: "1",
                  type: "Rat",
                  cute: "0",
                  ferocious: "You betcha"
                
              }
        ]
    
        const data = await request(app)
          .get("/sewermonsters")
          .expect("Content-Type", /json/)
          .expect(200);
    
        expect(data.body).toEqual(expectation);
      });
    
      test("GET sewermonsters by id", async () => {
        const expectation = {
            id: "1",
            type: "Rat",
            cute: "0",
            ferocious: "You betcha"
         
        };
    
        const data = await request(app)
          .get("/sewermonsters/1")
          .expect("Content-Type", /json/)
          .expect(200);
    
        expect(data.body).toEqual(expectation);
      });
    
      test("PUT sewermonsters", async () => {
        const update = {
          id: "1",
            type: "rat",
            cute: "0",
            ferocious: "You betcha"
          
        };
    
        const expectation = {
            id: "1",
            type: "rat",
            cute: "0",
            ferocious: "You betcha"
          
        };
    
        const id = 1;
    
        const data = await request(app)
          .put(`/sewermonsters/${id}`)
          .send(update)
          .expect("Content-Type", /json/)
          .expect(200);
    
        expect(data.body).toEqual(expectation);
      });
    
      test("DELETE sewermonsters", async () => {
        const id = 10
        const expectation = 
          {
            id: "1",
            type: "Rat",
            cute: "0",
            ferocious: "You betcha"
          };
      
        const data = await request(app)
          .delete(`/sewermonsters/1`)
          .expect("Content-Type", /json/)
          .expect(200);
    
        const sewermonsters = await request(app)
          .get("/sewermonsters")
          .expect("Content-Type", /json/)
          .expect(200);
    
        expect(data.body).toEqual(expectation);
      });
  });
