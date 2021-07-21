const express = require("express");
const Joi = require("joi");
const path = require("path")
const { isLoggedIn, isAdmin } = require('../middlewares')
const pool = require("../config");
const router = express.Router();

const transSchema = Joi.object({
    delivery_date: Joi.date().allow(null).required(),
    credit: Joi.number().required(),
    payament_method: Joi.string().required(),
    payament_status: Joi.string().required(),
    credit_due_date: Joi.date().min(Joi.ref('transaction_date')).required(),
    transaction_date: Joi.date().required(),
    delivery_status: Joi.number(),
    type: Joi.string().required(),
    employee_emp_id: Joi.string().required(),
    partner_par_id: Joi.string().required(),
    price: Joi.number().required(),
    count: Joi.number().required(),
    title: Joi.string().required(),
})
//add new transaction
router.post("/trans", isLoggedIn, isAdmin, async function(req, res, next) {
    try {
        await transSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let delivery_date = req.body.delivery_date
    let credit = req.body.credit
    let payament_method = req.body.payament_method
    let payament_status = req.body.payament_status
    let credit_due_date = req.body.credit_due_date
    let transaction_date = req.body.transaction_date
    let delivery_status = req.body.delivery_status
    let type = req.body.type
    type = type.toUpperCase()
    let employee_emp_id = req.body.employee_emp_id
    let partner_par_id = req.body.partner_par_id
    let price = req.body.price
    let count = req.body.count
    let title = req.body.title
    try {
        await conn.query(`
            INSERT INTO transaction(
                delivery_date, 
                credit, 
                payment_method, 
                payment_status, 
                credit_due_date, 
                transaction_date, 
                delivery_status, 
                type ,
                employee_emp_id, 
                partner_par_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [delivery_date, 
                credit, 
                payament_method, 
                payament_status, 
                credit_due_date, 
                transaction_date, 
                delivery_status, 
                type , 
                employee_emp_id, 
                partner_par_id])
        let tran_id = await conn.query('SELECT tran_id FROM transaction ORDER BY tran_id DESC LIMIT 1')
        let pro_id = await conn.query('SELECT pro_id FROM product WHERE title = ?', [title])
        let trann_id = await tran_id[0][0].tran_id
        let proo_id = await pro_id[0][0].pro_id
        type = type.toUpperCase()
        if(type === 'PURCHASE'){
            
            //create new product_transaction
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=0;')
            await conn.query(`
                INSERT INTO product_transaction(product_pro_id, transaction_tran_id, price, count)
                VALUES (?, ?, ?, ?)
                `, [proo_id, trann_id, price, count])
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=1;')
            let currentAmount = await conn.query('SELECT amount FROM product WHERE title = ?', [title])

            //update inventory
            currentAmount = parseInt(currentAmount[0][0].amount) + parseInt(count)
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=0;')
            await conn.query(`
                UPDATE product
                SET amount = ?
                WHERE title = ?
                `, [currentAmount, title])
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=1;')
        } else {
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=0;')
            await conn.query(`
                INSERT INTO product_transaction(product_pro_id, transaction_tran_id, price, count)
                VALUES (?, ?, ?, ?)
                `, [proo_id, trann_id, price, count])
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=1;')
            let currentAmount = await conn.query('SELECT amount FROM product WHERE title = ?', [title])
            currentAmount = parseInt(currentAmount[0][0].amount) - parseInt(count)
            if(currentAmount <= 0){
                currentAmount = 0
            }
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=0;')
            await conn.query(`
                UPDATE product
                SET amount = ?
                WHERE title = ?
                `, [currentAmount, title])
            await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=1;')
        }
        conn.commit()
        res.send('Success!')
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get all transaction or search transation
router.get("/trans", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let search = req.query.search || ''
    try {
        /* ยิง Postman ด้วย param ผ่านแล้ว!!! */
        if(search.length > 0){
            let sql = `SELECT * FROM transaction WHERE tran_id LIKE ? OR type LIKE ? OR payment_method LIKE ? OR payment_status LIKE ?`
            let cond = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
            let info = await pool.query(sql, cond);
            res.send(info[0])
        } else {
            let info = await conn.query("SELECT * FROM transaction")
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

//get transaction details
router.get("/trans/:id", isLoggedIn, async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("select t.*, e.fname, e.lname, p.company_name, p.par_fname, p.par_lname from transaction t join employee e on (t.employee_emp_id = e.emp_id) join partner p  on (t.partner_par_id = p.par_id) where t.tran_id = ?", [req.params.id])
        let total = await conn.query("SELECT transaction_tran_id, sum(price*count) as 'price' FROM product_transaction where transaction_tran_id = ?", [req.params.id])
        let product = await conn.query("select p.title, pt.count, (pt.price*pt.count) as total, pt.price as price from product p join product_transaction pt on p.pro_id = pt.product_pro_id where pt.transaction_tran_id = ?", [req.params.id])
        conn.commit()
        res.send({
            info : info[0],
            total : total[0],
            product : product
        })
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});
exports.router = router;