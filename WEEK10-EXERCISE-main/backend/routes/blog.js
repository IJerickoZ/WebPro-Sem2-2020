const express = require("express");
const path = require("path")
const pool = require("../config");
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './static/uploads') // path to save file
    },
    filename: function(req, file, callback) {
        // set file name
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

router = express.Router();

router.post("/:blogId/comments", async function(req, res, next) {
    // Your code here
    const comment = req.body.comment;
    const like = req.body.like
    console.log(comment)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let edit = await conn.query("INSERT INTO comments(blog_id, comment, `like`, comment_date) VALUES ( ?, ?, ?, CURRENT_TIMESTAMP)", [req.params.blogId, comment, like])
        conn.commit()
        res.send("success!");
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

router.put("/comments/:commentId", async function(req, res, next) {
    // Your code here
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let com = await pool.query("SELECT * FROM comments WHERE id=?", [
            req.params.commentId
        ]);
        let comment = req.body.comment

        await conn.query('UPDATE comments SET comments.comment=? WHERE id=?', [comment, req.params.commentId])
        conn.commit()
        res.json({ message: "New comment " + req.params.commentId + " is " + comment })
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }

});

router.delete("/comments/:commentId", async function(req, res, next) {
    // Your code here
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query('DELETE FROM comments WHERE id=?', [req.params.commentId])
        conn.commit()
        res.json({ message: "Delete Comment id " + req.params.commentId + " Comlete" })
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }

});

router.put("/comments/addlike/:commentId", async function(req, res, next) {
    // Your code here
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let com = await pool.query("SELECT * FROM comments WHERE id=?", [
            req.params.commentId
        ]);
        let like = com[0][0].like
        like++;
        console.log(com[0][0].like)
        await conn.query('UPDATE comments SET comments.like=? WHERE id=?', [like, req.params.commentId])
        conn.commit()
        res.json({ message: "Add like in comment " + req.params.commentId + "Current Like is " + like })
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }

});

router.get("/blogs/search", async function(req, res, next) {
    // Your code here
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {

        let findWord = '%' + req.body.search + '%' //โจทย์ต้องการ params หรือ body???
        console.log(findWord)
        let title = await conn.query("SELECT * FROM blogs WHERE title LIKE ?", [findWord])
        conn.commit()
        res.send(title[0])
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

router.put("/blogs/addlike/:blogId", async function(req, res, next) {
    // Your code here
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let blog = await pool.query("SELECT * FROM blogs WHERE id=?", [
            req.params.blogId
        ]);
        let like = blog[0][0].like
        like++;
        console.log(blog[0][0].like)
        await conn.query('UPDATE blogs SET blogs.like=? WHERE id=?', [like, req.params.blogId])
        conn.commit()
        res.json({ like: like })
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }

});

router.post("/blogs", upload.single('myImage'), async function(req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    const pinned = req.body.pinned;
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let results = await conn.query(
            "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);", [title, content, status, pinned]
        )
        const blogId = results[0].insertId;
        await conn.query("INSERT INTO images(blog_id, file_path) VALUES(?, ?);", [blogId, file.path.substr(6)])
        conn.commit()
        res.send("success!");
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

router.get("/blogs/:id", function(req, res, next) {
    const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
        req.params.id,
    ]);
    const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
        req.params.id,
    ]);

    Promise.all([promise1, promise2])
        .then((results) => {
            const blogs = results[0];
            const comments = results[1];
            res.render("blogs/detail", {
                blog: blogs[0][0],
                comments: comments[0],
                error: null,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

router.put('/blogs/:id', upload.single('myImage'), async(req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const file = req.file;

        if (file) {
            await conn.query(
                "UPDATE images SET file_path=? WHERE blog_id=?", [file.path.substr(6), req.params.id])
        }

        await conn.query('UPDATE blogs SET title=?,content=?, pinned=?, blogs.like=?, create_by_id=? WHERE id=?', [req.body.title, req.body.content, req.body.pinned, req.body.like, null, req.params.id])
        conn.commit()
        res.json({ message: "Update Blog id " + req.params.id + " Complete" })
    } catch (error) {
        await conn.rollback();
        return next(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});


router.delete('/blogs/:id', async(req, res, next) => {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        let comments = await conn.query('SELECT * FROM comments WHERE blog_id=?', [req.params.id])

        if (comments[0].length > 0) {
            res.status(409).json({ message: "Can't Delete because this blog has comment!!!" })
        } else {
            await conn.query('DELETE FROM blogs WHERE id=?;', [req.params.id]) // delete blog
            await conn.query('DELETE FROM images WHERE blog_id=?;', [req.params.id]) // delete image
            await conn.commit()
            res.json({ message: 'Delete Blog id ' + req.params.id + ' complete' })
        }
    } catch (error) {
        await conn.rollback();
        next(error);
    } finally {
        console.log('finally')
        conn.release();
    }
});

exports.router = router;