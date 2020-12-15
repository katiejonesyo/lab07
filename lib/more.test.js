require('dotenv').config();
const fs = require('fs');
const pool = require('../utils/pool.js');
const Sewers = require('../models/sewers.js')
const Sewermonsters = require('../models/sewermonsters.js')
const request = require('supertest');
const app = require('../app')

describe("app routes", () => {

    beforeEach( async () => {
      await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    });
  
    afterAll(() => {
      return pool.end();
    });


    test("POST sewermonsters", async () => {
      const sewermonsters = await Sewermonsters
      .insert({
        type: "Rat",
        cute: "0",
        ferocious: "You betcha"
        })
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
        const sewers = await Sewers
        .insert ({
          size: "LÖRGE",
          smelly_scale: "Very smelly",

        })
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
           
        ].map(sewermonster => Sewermonsters.insert(sewermonster)));

        const res = await request(app)
          .get('/sewermonsters');
    

        expect(res.body).toEqual(expect.arrayContaining(sewermonsters))
        expect(res.body).toHaveLength(sewermonsters.length);
      });

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
      const sewers = await Sewers.insert(
          { smelly_scale: "Very smelly"});
      const sewermonsters = await Sewermonsters
      .insert({
        type: "Rat",
        cute: "0",
        ferocious: "You betcha",
        sewersId: sewers.id,
        });

      const res = await request(app)
      .put(`/sewermonsters/${sewermonsters.id}`)
      .send({
        id: sewermonsters.id,
        type: "rat",
        sewersId: sewers.id,
        cute: "0",
        ferocious: "Man oh man, yea it is"
      })
    
        expect(res.body).toEqual({
          id: sewermonsters.id,
          type: "rat",
          sewers_id: sewers.id,
          cute: "0",
          ferocious: "Man oh man, yea it is"
        });
      });
    
      test("DELETE sewermonsters", async () => {
        const sewers = await Sewers.insert(
          { smelly_scale: "Very smelly"});
        const sewermonsters = await Sewermonsters
          .insert({
            type: "Rat",
            cute: "0",
            ferocious: "You betcha",
            sewersId: sewers.id,
            });

        const res = await request(app)
            .delete(`/sewermonsters/${sewermonsters.id}`)

        expect(sewermonsters).toEqual(res.body);

      });
  });

  
