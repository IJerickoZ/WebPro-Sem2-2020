const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();
const Joi = require('joi')
const { isLoggedIn, isAdmin } = require('../middlewares')
//get all items information or search item
router.get("/products", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let search = req.query.search || ''
    try {
        /* ยิง Postman ด้วย param ผ่านแล้ว!!! */
        if(search.length > 0){
            let sql = `SELECT title, amount, type, ifnull(brand, '-')brand 
                        FROM product 
                        WHERE title LIKE ? OR type LIKE ? OR brand LIKE ?`
            let cond = [`%${search}%`, `%${search}%`, `%${search}%`]
            let info = await pool.query(sql, cond);
            res.send(info[0])
        } else {
            let info = await conn.query("SELECT * FROM product")
            conn.commit()
            res.send(info[0])
        }
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get product details
router.get("/products/:id", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query(`
        SELECT * FROM product p
        JOIN product_transaction pt
        ON p.pro_id = pt.product_pro_id
        WHERE pro_id = ?
        `
        , [req.params.id])
        conn.commit()
        res.send(info[0][0]);
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});


const productSchema = Joi.object({
    title: Joi.string().required(),
    mfd: Joi.date(),
    brand: Joi.string(),
    type: Joi.string().required(),
})

//add new product
router.post("/products", isLoggedIn, isAdmin, async function(req, res, next) {
    try {
        await productSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let type = req.body.type
    let mfd = req.body.mfd
    let brand = req.body.brand
    let title = req.body.title
    type = type.toUpperCase()
    try {
        await conn.query(`
            INSERT INTO product(title, mfd, brand, type, amount) 
            VALUES (?, ?, ?, ?, 0)
            `, [title, mfd, brand, type])
        conn.commit()
        res.send('success!')
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});
exports.router = router;