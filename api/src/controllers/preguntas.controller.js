import { pool } from "../database/db.js"

export const getPreguntas = async (req,res)=>{
    const {tabla} = req.params
    try {
        const {rows:preguntas} = await pool.query(`SELECT * FROM ${tabla} ORDER BY id`)
        return await res.status(200).json(preguntas)
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal server error')
    }
}
export const postPregunta = async (req,res)=>{
    const {tabla} = await req.params
    const {body}=req
    try {
        await body.forEach(async element=>{
            let keys = Object.keys(element)
            let cols = ''
            let values = ''
            keys.forEach((key,i)=>{
                cols = cols + `${key} ${i !== keys.length-1 ? ',' : ''}`
                values = values + `'${element[key]}' ${i !== keys.length-1 ? ',' : ''}`
            })
            console.log(cols,values)
            try {
                await pool.query(`INSERT INTO ${tabla} (${cols}) VALUES (${values})`)
                console.log('INSERCION',tabla,element)
            } catch (e) {
            console.log(e)
                
            }
        })
        return await res.status(200).json('Pregunta insertada con exito')
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal server error')
    }
}