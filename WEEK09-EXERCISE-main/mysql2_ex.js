async function main() {
    const mysql = require('mysql2/promise');
    // create the connection
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '10870',
        database: 'webpro',
    });

    // try{
    //     const [rows, fields] = await conn.query('SELECT * FROM blogs')
    //     console.log('rows:', rows)
    // }catch(err){
    //     console.log(err)
    // }

    // try {
    //     const [rows, fields] = await conn.query(
    //         'INSERT INTO `blogs`(title, content, status, pinned) VALUES(?, ?, ?, ?);', ['My new blog', 'TEST CONTENT', '01', 0]
    //     )
    //     console.log('affectedRows:', rows.affectedRows)
    // } catch (err) {
    //     console.log(err)
    // }

    try {
        const [rows, fields] = await conn.query(
            'UPDATE `blogs` SET title = ?, content = ? WHERE id = ?;', ['My new blog 3', 'TEST CONTENT 2', 14]
        )
        console.log(rows)
        console.log('changedRows:', rows.changedRows)
    } catch (err) {
        console.log(err)
    }

}

main()