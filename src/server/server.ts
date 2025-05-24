import express from 'express'
import userRoute from './routes/userRoute'

const app = express()
const PORT = 5000

app.use(express.json())
app.use('/users', userRoute)

app.get('/', (req, res) => {
    res.send('Hello from TypeScript!')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
