const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const search = req.query.search || ''

    let sql = 'SELECT a.*, b.file_path FROM blogs AS a LEFT JOIN (SELECT * FROM images WHERE main=1) AS b ON a.id = b.blog_id'
    let cond = []
    console.log(search)
    if (search.length > 0) {
      sql = sql + ' WHERE a.title LIKE ? OR a.content LIKE ?;'
      console.log(sql)
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

exports.router = router;
