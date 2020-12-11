require('dotenv').config();
const fs = require('fs');
const pool = require('../utils/pool.js');
const Sewers = require('../models/sewers.js')
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
        const sewers = await Sewers
        .insert ({
          size: "LÖRGE",
          smelly_scale: "Very smelly",

        })
        const post = {
            type: "Rat",
            cute: "1",
            ferocious: "man oh man, is it!",
            sewers_id: sewers.id

        };
        const expectation = {
          id: "2",
          sewers_id: sewers.id,
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
                  sewers_id: "null",
                  ferocious: "You betcha"
                
              }
        ]
    
        const data = await request(app)
          .get("/sewermonsters")
          .expect("Content-Type", /json/)
          .expect(200);
    
        expect(data.body).toEqual(expectation);
      });
    
      //NORMAL FIND BY ID TEST//
      // test("GET sewermonsters by id", async () => {
      //   const expectation = {
      //       id: "1",
      //       type: "Rat",
      //       cute: "0",
      //       ferocious: "You betcha"
         
      //   };
    
      //   const data = await request(app)
      //     .get("/sewermonsters/1")
      //     .expect("Content-Type", /json/)
      //     .expect(200);
    
      //   expect(data.body).toEqual(expectation);
      // });



      //JOIN FIND BY ID TEST//
      test('Get by id', async () => {
        const sewers = await Sewers.insert(
          { smelly_scale: "Very smelly"});

        const sewermonsters = await Promise.all([
          { type:"spidey", 
          cute:"2", 
          ferocious: "Yes", 
          sewers_id: sewers.id 
        },
          { type:"rat", 
          cute:"0", 
          ferocious: "You betcha", 
          sewers_id: sewers.id 
        }
          

        ].map(sewermonsters => Sewermonsters.insert(sewermonsters)));
    
        const data = await request(app)
          .get(`/sewers/${sewers.id}`);
        expect(data.body).toEqual({
          ...sewers,
          sewermonsters: expect.arrayContaining(sewermonsters)
        });
      });
    
      test("PUT sewermonsters", async () => {
        const update = {
          id: "1",
            type: "rat",
            sewers_id: "null",
            cute: "0",
            ferocious: "You betcha"
          
        };
    
        const expectation = {
            id: "1",
            type: "rat",
            sewers_id: "null",
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
            sewers_id: "null",
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

  
