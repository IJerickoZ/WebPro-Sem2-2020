const express = require("express");
const pool = require("../config");
const Joi = require('joi')


const newBlogSchema = Joi.object({
    title: Joi.string().required().pattern(/[A-Za-z]{10,25}/),
    content: Joi.string().required().min(50),
    ref: Joi.string().uri(),
    audience: Joi.string().valid('status_private', 'status_public').required(),
    pin: Joi.boolean().required(),    
    create_date: Joi.date().max(Joi.ref('end_date')),
    end_date: Joi.date()
}).with('create_date', 'end_date')

router = express.Router();
router.post('/blogs/create', async (req, res, next) => {
    try{
        await newBlogSchema.validateAsync(req.body,  { abortEarly: false })
    }catch(err){
        return res.status(400).json(err)
    }
    let title = req.body.title
    let content = req.body.content
    let ref = req.body.ref
    let audience = req.body.audience
    let pin = req.body.pin
    let create_date = req.body.create_date
    let end_date = req.body.end_date
    const conn = await pool.getConnection()
    await conn.beginTransaction() 
    try{
        if(audience === 'status_private'){
            if(pin === true){
                await conn.query('INSERT INTO blogs(title, content, status, pinned, create_date) VALUES (?, ?, 01, 1, ?)'
            , [title, content, create_date])
            } else {
                await conn.query('INSERT INTO blogs(title, content, status, pinned, create_date) VALUES (?, ?, 01, 1, ?)'
            , [title, content, create_date])
            }
        } else {
            if(pin === true){
                await conn.query('INSERT INTO blogs(title, content, status, pinned, create_date) VALUES (?, ?, 02, 0, ?)'
            , [title, content, create_date])
            } else {
                await conn.query('INSERT INTO blogs(title, content, status, pinned, create_date) VALUES (?, ?, 02, 0, ?)'
            , [title, content, create_date])
            }
        }
        conn.commit()
        return res.send('ok')
    }catch(err){
        conn.rollback()
        return res.send(err)
    }finally{
        conn.release()
        console.log('END')
    }
})

exports.router = router