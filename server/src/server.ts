import express from 'express'
import userRoute from './routes/user.route'
import userAuth from './routes/auth.route'
import componentRoutes from './routes/component.route'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors()) // allows all origins (not recommended for production)
app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/auth', userAuth)
app.use('/api/components', componentRoutes)

app.get('/', (req, res) => {
    res.send('Hello from TypeScript!')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
