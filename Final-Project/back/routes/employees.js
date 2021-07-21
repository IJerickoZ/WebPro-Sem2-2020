const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();
const Joi = require('joi')
const { isLoggedIn, isAdmin } = require('../middlewares')
const bcrypt = require('bcrypt')

//get all member details or Search member
router.get("/employees", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let search = req.query.search || ''
    try {
        /* ยิง Postman ด้วย param ผ่านแล้ว!!! */
        if(search.length > 0){
            let sql = "SELECT * FROM employee WHERE fname LIKE ? OR lname LIKE ?"
            let cond = [`%${search}%`, `%${search}%`]
            let info = await pool.query(sql, cond);
            res.json({
                blogs : info[0]
            })
        } else {
            let info = await conn.query("SELECT * FROM employee")
            conn.commit()
            res.json({
                blogs : info[0]
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

//get member details
router.get("/employees/:id", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM employee WHERE emp_id = ?", [req.params.id])
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

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if(!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))){
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const citizenValidator = (value, helpers) => {
    if (value.length !== 13) {
        throw new Joi.ValidationError('citizen must contain at 13 number')
    }
    return value
}

const empSchema = Joi.object({
    citizen: Joi.string().required().custom(citizenValidator),
    dob: Joi.date().required(),
    position: Joi.string().required(),
    salary: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required().max(10),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    gender: Joi.string().required(),
    password: Joi.string().required(),
})

//add member
router.post("/employees", isLoggedIn, isAdmin, async function(req, res, next) {
    let citizen = req.body.citizen
    let degree = req.body.degree
    let dob = req.body.dob
    let position = req.body.position
    let salary = req.body.salary
    let address = req.body.address
    let email = req.body.email
    let phone = req.body.phone
    let fname = req.body.fname
    let lname = req.body.lname
    let gender = req.body.gender
    let password = await bcrypt.hash(req.body.password, 5)
    try {
        await empSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query(`
        INSERT INTO employee(citizen_id, degree, dob, position, salary, address, email, phone, fname, lname, gender, password, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user')
        `, [citizen, degree, dob, position, salary, address, email, phone, fname, lname, gender, password])
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

//delete member 
router.delete("/employees/:id", isLoggedIn, isAdmin, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let edit = await conn.query('DELETE FROM employee WHERE emp_id = ?', [req.params.id])
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

const editEmpSchema = Joi.object({
    position: Joi.string().required(),
    salary: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required().max(10),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    degree: Joi.string().allow('')
})

//edit member detail
router.put("/employees/:id", isLoggedIn, isAdmin,  async function(req, res, next) {
    try {
        await editEmpSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let degree = req.body.degree
    let position = req.body.position
    let salary = req.body.salary
    let address = req.body.address
    let email = req.body.email
    let phone = req.body.phone
    let fname = req.body.fname
    let lname = req.body.lname
    try {
        await conn.query(`
        UPDATE employee 
        SET degree = ?,
            position = ?,
            salary = ?,
            address = ?,
            email = ?,
            phone = ?,
            fname = ?,
            lname = ? 
        WHERE emp_id = ?`,[degree, position, salary, address, email, phone, fname, lname, req.params.id])
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

const passSchema = Joi.object({
    oldPass: Joi.string().required(),
    newPass: Joi.string().required(),
    conPass: Joi.string().valid(Joi.ref('newPass')).required(),
    id: Joi.any()
})

router.put("/employees/:id/password", isLoggedIn, async function(req, res, next) {
    try {
        await passSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }

    let oldPass = req.body.oldPass
    let newPass = await bcrypt.hash(req.body.newPass, 5)
    let id = req.body.id
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [users] = await conn.query('SELECT * FROM employee WHERE emp_id=?', [id])
        const user = users[0]
        if (!(await bcrypt.compare(oldPass, user.password))){
            throw new Error('Incorrect password')
        }

        await conn.query(`
        UPDATE employee 
        SET password = ?
        WHERE emp_id = ?`,[newPass, id])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        res.status(400).json(err.toString())
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

exports.router = router;