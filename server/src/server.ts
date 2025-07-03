import express from 'express'
import userRoute from './routes/user.route'
import userAuth from './routes/auth.route'
import componentRoute from './routes/component.route'
import componentTypeRoute from './routes/componentType.route'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/components', componentRoute)
app.use('/api/componentTypes', componentTypeRoute)
app.use('/api/auth', userAuth)

app.get('/', (req, res) => {
    res.send('Hello from TypeScript!')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
