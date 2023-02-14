import express  from 'express' 
import logger from './middlewares/logger.js'
import router from './router/router.js'
import cors from 'cors'


  
const app = express()
const PORT = process.env.PORT || 3001

app.set('trust proxy', true)

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/',router)

app.listen(PORT,()=>{
    return console.log(`Server running in port http://localhost:${PORT}`)
})


