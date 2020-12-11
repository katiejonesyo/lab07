const pool = require('../utils/pool.js');
const Sewermonsters = require('../models/sewermonsters.js')

module.exports = class Sewers {
    id;
    size;
    smelly_scale;

    constructor(row) {
        this.id = String(row.id);
        this.size = row.size;
        this.smelly_scale = row.smelly_scale;
    }


     // Crud Methods

     static async insert({ size, smelly_scale }) {
        const { rows } = await pool.query(
          'INSERT INTO sewers (size, smelly_scale ) VALUES ($1, $2) RETURNING *',
          [size, smelly_scale]
        );
           
        return new Sewers(rows[0]);
      };


    static async find() {
        const { rows } = await pool.query('SELECT * FROM sewers')
            return rows.map(row => new Sewers(row));
    }


    //OLD FIND BY ID //
    // static async findById(id) {
    //     const { rows } = await pool.query('SELECT * FROM sewers WHERE id=$1', [id]);

    //     if(!rows[0]) throw new Error(`No sewers with id ${id}`);
    //     return new Sewers(rows[0]);
    // }


    //JOIN FIND BY ID//
    static async findById(id) {
        const { rows } = await pool.query(
          `SELECT
            sewers.*,
            array_to_json(array_agg(sewermonsters.*)) AS sewermonsters
              FROM sewers 
              JOIN sewermonsters
              ON sewers.id = sewermonsters.sewers_id
              WHERE sewers.id=$1
              GROUP BY sewers.id`, [id]
        );
        if (!rows[0]) throw new Error(`No sewers with id ${id}`);
        return {
          ...new Sewers(rows[0]),
          sewermonsters: rows[0].sewermonsters.map(sewermonsters => new Sewermonsters(sewermonsters))
        };
      }
    

    static async update(id, { size, smelly_scale }) {
        const { rows } = await pool.query(
            `UPDATE sewers
            SET size=$1,
                smelly_scale=$2
            WHERE id=$3
            RETURNING *
            `,
            [size, smelly_scale, id]
        );

        return new Sewers(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM sewers WHERE id=$1 RETURNING *`, [id]);
        return new Sewers(rows[0]);
    }

};


