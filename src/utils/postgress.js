const { Pool } = require('pg');
const { pgConfig } = require('../utils/config.js');

let pool = new Pool(pgConfig)

async function fetch(query, ...array){
    const client = await pool.connect()
    try {
        array = array.filter(arg => arg != undefined)
        let { rows: [row] } = await client.query(query, array.length ? array : null)
        
        return [row]
    } catch (error) {
        return { error }
    }finally{
        await client.release()
    }
}

async function fetchAll(query, ...array){
    const client = await pool.connect()
    try {
        array = array.filter(arg => arg != undefined)
        let { rows } = await client.query(query, array.length ? array : null)
        return rows
    } catch (error) {
        return { error }
    }finally{
        await client.release()
    }
}

module.exports = {
    fetchAll, fetch
}