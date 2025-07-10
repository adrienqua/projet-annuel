import express from 'express'
import userRoute from './routes/user.route'
import userAuth from './routes/auth.route'
import compareRoute from './routes/compare.route'
import componentRoute from './routes/component.route'
import componentTypeRoute from './routes/componentType.route'
import buildRoute from './routes/build.route'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', userAuth)
app.use('/api/users', userRoute)
app.use('/api/components', componentRoute)
app.use('/api/componentTypes', componentTypeRoute)
app.use('/api/builds', buildRoute)
app.use('/api/compare', compareRoute)

app.get('/', (req, res) => {
    res.send('Hello from TypeScript!')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
