const pool = require('../utils/pool.js');

module.exports = class Sewers {
    id;
    size;
    smelly_scale;

    constructor(row) {
        this.id = row.id;
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

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM sewers WHERE id=$1', [id]);

        if(!rows[0]) throw new Error(`No sewers with id ${id}`);
        return new Sewers(rows[0]);
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
