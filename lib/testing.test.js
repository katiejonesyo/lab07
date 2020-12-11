require('dotenv').config();
const fs = require('fs');
const pool = require('../utils/pool.js');
const Sewers = require('../models/sewers.js')
const Sewermonsters = require('../models/sewermonsters.js')
const request = require('supertest');
const app = require('../app')

describe("app routes", () => {

    let sewers;
    beforeEach( async () => {
      await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
      sewers = await Sewers
      .insert({
        size: "LARGE",
        smelly_scale: "Very smelly"
        })
    });
  


    
    afterAll(() => {
      return pool.end();
    });
  
  
  
    test("POST sewers", async () => {
      const post = {
        size: "LARGE",
        smelly_scale: "Very smelly"
      };
      const expectation = {
        id: "2",
        size: "LARGE",
        smelly_scale: "Very smelly"
        
     
      };
      const data = await request(app)
        .post("/sewers")
        .send(post)
        .expect("Content-Type", /json/)
        .expect(200);
  
      expect(data.body).toEqual(expectation);
    });
  
    test("GET all sewers", async () => {
      const expectation = [
        {
            size: "LARGE",
            smelly_scale: "Very smelly",
            id: "1"
        }
      ];
  
      const data = await request(app)
        .get("/sewers")
        .expect("Content-Type", /json/)
        .expect(200);
  
      expect(data.body).toEqual(expectation);
    });
  
    // test("GET sewers by id", async () => {
    //   const expectation = {
    //     size: "LARGE",
    //     smelly_scale: "Very smelly",
    //     id: "1"
       
    //   };
  
    //   const data = await request(app)
    //     .get("/sewers/1")
    //     .expect("Content-Type", /json/)
    //     .expect(200);
  
    //   expect(data.body).toEqual(expectation);
    // });
  
    test("PUT sewers", async () => {
      const update = {
        id: sewers.id,
        size: "LARGE",
        smelly_scale: "Very smelly"
        
      };
  
      const expectation = {
        id: "1",
        size: "LARGE",
        smelly_scale: "Very smelly"
        
      };
  
      const id = 1;
  
      const data = await request(app)
        .put(`/sewers/${sewers.id}`)
        .send(update)
        .expect("Content-Type", /json/)
        .expect(200);
  
      expect(data.body).toEqual(expectation);
    });
  
    test("DELETE sewers", async () => {
      const id = 10
      const expectation = 
        {
            size: "LARGE",
            smelly_scale: "Very smelly",
            id: "1"
        };
    
      const data = await request(app)
        .delete(`/sewers/1`)
        .expect("Content-Type", /json/)
        .expect(200);
  
      const sewers = await request(app)
        .get("/sewers")
        .expect("Content-Type", /json/)
        .expect(200);
  
      expect(data.body).toEqual(expectation);
    });

});