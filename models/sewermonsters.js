// const pool = require('../utils/pool.js');

// module.exports = class Sewermonsters {
//     id;
//     type;
//     cute;
//     ferocious;
//     sewermonsters_id;

//     constructor(row) {
//         this.id = row.id;
//         this.type = row.type;
//         this.cute = row.cute;
//         this.ferocious = row.ferocious;
//         this.sewermonsters_id = row.sewermonsters_id;

//     }

//      // Crud Methods

//      static async insert({ type, cute, ferocious, sewermonstersId }) {
//         const { rows } = await pool.query(
//           'INSERT INTO sewermonsters (type, cute, ferocious, sewermonsters_id) VALUES ($1, $2, $3, $4) RETURNING *',
//           [type, cute, ferocious, sewermonstersId]
//         );
           
//         return new Sewermonsters(rows[0]);
//       };


//     static async find() {
//         const { rows } = await pool.query('SELECT * FROM sewermonsters')
//             return rows.map(row => new Sewermonsters(row));
//     }

//     static async findById(id) {
//         const { rows } = await pool.query('SELECT * FROM sewermonsters WHERE id=$1', [id]);

//         if(!rows[0]) throw new Error(`No sewermonsters with id ${id}`);
//         return new Sewermonsters(rows[0]);
//     }

//     static async update(id, { type, cute, ferocious, sewermonstersId  }) {
//         const { rows } = await pool.query(
//             `UPDATE sewermonsters
//             SET type=$1,
//                 cute=$2,
//                 ferocious=$3,
//                 sewermonstersId=$4
//             WHERE id=$5
//             RETURNING *
//             `,
//             [type, cute, ferocious, sewermonstersId , id]
//         );

//         return new Sewermonsters(rows[0]);
//     }

//     static async delete(id) {
//         const { rows } = await pool.query(
//             `DELETE FROM sewermonsters WHERE id=$1 RETURNING *`, [id]);
//         return new Sewermonsters(rows[0]);
//     }


// };
