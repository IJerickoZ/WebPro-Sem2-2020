const { json } = require("express");
const express = require("express");
const pool = require("../config");

const router = express.Router();

// Get comment
router.get('/:blogId/comments', function(req, res, next){
});

// Create new comment
router.post('/:blogId/comments', async function(req, res, next){
    comment = req.body.comment
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    try{
        const [rows1, fields1] = await conn.query(
            'INSERT INTO `comments` (`blog_id`, `comment`, `like`, `comment_date`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', 
            [req.params.blogId, comment, 0]
        )
        const [rows2, fields2] = await conn.query(
            'SELECT * FROM `comments` WHERE `id` = ?', 
            [rows1.insertId]
        )
        await conn.commit()
        return res.json(rows2[0])
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    }finally{
        console.log('finally')
        conn.release();
    }
});

// Update comment
router.put('/comments/:commentId', async function(req, res, next){
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
        await conn.query(
            "UPDATE `comments` SET `comment` = ?, comment_date = CURRENT_TIMESTAMP WHERE `id` = ?", 
            [req.body.comment, req.params.commentId]
        )
        let [rows, fields] = await conn.query("SELECT * FROM `comments` WHERE `id` = ?", [
            req.params.commentId,
          ]);
          await conn.commit();
          console.log(rows)
          res.json(rows)
    } catch(err){
        await conn.rollback();
        console.log(err)
        return res.status(500).json(err);
    }finally{
        console.log('finally')
        conn.release();
    }
});

// Delete comment
router.delete('/comments/:commentId', async function(req, res, next){
    try {
        let [rows, fields] = await pool.query("DELETE FROM comments WHERE `id` = ?", [
            req.params.commentId
        ])
        res.send("Success")
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Add like comment
router.put('/comments/addlike/:commentId', async function(req, res, next){
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    console.log(req)
    try {
      let [rows, fields] = await conn.query("SELECT `like` FROM `comments` WHERE `id` = ?", [
        req.params.commentId,
      ]);
      let like = rows[0].like + 1;
  
      await conn.query("UPDATE `comments` SET `like` = ? WHERE `id` = ?", [
        like,
        req.params.commentId,
      ]);
  
      await conn.commit();
      res.json({ like: like });
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
});


exports.router = router