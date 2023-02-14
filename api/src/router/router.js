import { Router } from "express";
import v1Routes from './v1.routes.js'


const router = Router()

router.get('/',(req,res)=>{
    try {
        console.log('Hello World!')
    } catch (error) {
        console.log(error)
    }
})

router.use('/api/v1',v1Routes)

export default router