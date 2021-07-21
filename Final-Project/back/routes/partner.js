const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();
const Joi = require('joi')
const { isLoggedIn, isAdmin } = require('../middlewares')

//get all partner details or Search partner
router.get("/partner", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let search = req.query.search || ''
    try {
        /* ยิง Postman ด้วย param ผ่านแล้ว!!! */
        if(search.length > 0){
            let sql = "SELECT * FROM partner WHERE par_fname LIKE ? OR par_lname LIKE ? OR company_name LIKE ?"
            let cond = [`%${search}%`, `%${search}%`, `%${search}%`]
            let info = await pool.query(sql, cond);
            res.json({
                blogs : info[0]
            })
        } else {
            let info = await conn.query("SELECT * FROM partner")
            conn.commit()
            res.send({
                blogs: info[0]
            })
        }
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get partner details
router.get("/partner/:id", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM partner WHERE par_id = ?", [req.params.id])
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

const partnerSchema = Joi.object({
    delivery_address: Joi.string().required(),
    company_name: Joi.string().required(),
    legal_address: Joi.string().required(),
    type: Joi.string().required(),
    par_fname: Joi.string().required(),
    par_lname: Joi.string().required(),
    email1: Joi.string().email().required(),
    email2: Joi.string().email().allow(''),
    phone1: Joi.string().required(),
    phone2: Joi.string().allow(''),
    description: Joi.string().allow('')
})

//add partner
router.post("/partner", isLoggedIn, isAdmin, async function(req, res, next) {
    try {
        await partnerSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let deliverly_address = req.body.delivery_address
    let company_name = req.body.company_name
    let par_fname = req.body.par_fname
    let par_lname = req.body.par_lname
    let legal_address = req.body.legal_address
    let type = req.body.type
    let email1 = req.body.email1
    let email2 = req.body.email2
    let phone1 = req.body.phone1
    let phone2 = req.body.phone2
    let description = req.body.description
    try {
        let edit = await conn.query(`
        INSERT INTO partner(delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [deliverly_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2, description])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

//delete partner 
router.delete("/partner/:id", isLoggedIn, isAdmin, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query('SET FOREIGN_KEY_CHECKS = 0;')
        await conn.query('DELETE FROM partner WHERE par_id = ?', [req.params.id])
        await conn.query('SET FOREIGN_KEY_CHECKS = 1;')
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

//edit partner detail
router.put("/partner/:id", isLoggedIn, isAdmin, async function(req, res, next) {
    try { 
        await partnerSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        res.status(400).json(err)
    }
    
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let delivery_address = req.body.delivery_address
    let company_name = req.body.company_name
    let fname = req.body.par_fname
    let lname = req.body.par_lname
    let legal_address = req.body.legal_address
    let phone1 = req.body.phone1
    let phone2 = req.body.phone2
    let email1 = req.body.email1
    let email2 = req.body.email2
    try {
        await conn.query('SET FOREIGN_KEY_CHECKS = 0;')
        await conn.query(`
        UPDATE partner 
        SET delivery_address = ?,
            company_name = ?,
            par_fname = ?,
            par_lname = ?,
            legal_address = ?,
            phone1 = ?,
            phone2 = ?,
            email1 = ?,
            email2 = ? 
        WHERE par_id = ?`,[delivery_address, company_name, fname, lname, legal_address, phone1, phone2, email1, email2, req.params.id])
        await conn.query('SET FOREIGN_KEY_CHECKS = 1;')
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});


exports.router = router;