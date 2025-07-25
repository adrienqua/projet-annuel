import '../lib/instrument'
import * as Sentry from '@sentry/node'
import express from 'express'
import userRoute from './routes/user.route'
import userAuth from './routes/auth.route'
import compareRoute from './routes/compare.route'
import componentRoute from './routes/component.route'
import componentTypeRoute from './routes/componentType.route'
import buildRoute from './routes/build.route'
import checkoutRoute from './routes/checkout.route'
import orderRoute from './routes/order.route'
import cartRoute from './routes/cart.route'
import twofaRoute from './routes/twofa.route'
import carrierRoute from './routes/carrier.route'
import addressRoute from './routes/address.route'
import manufacturerRoute from './routes/manufacturer.route'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000
const allowedOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://buildmypc.cloud',
    'https://buildmypc.cloud',
    'https://www.buildmypc.cloud',
    'https://api.buildmypc.cloud',
]

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`))
            }
        },
        credentials: true,
    })
)

app.use(express.json())
app.use('/api/auth', userAuth)
app.use('/api/users', userRoute)
app.use('/api/components', componentRoute)
app.use('/api/componentTypes', componentTypeRoute)
app.use('/api/builds', buildRoute)
app.use('/api/compare', compareRoute)
app.use('/api/checkout', checkoutRoute)
app.use('/api/orders', orderRoute)
app.use('/api/cart', cartRoute)
app.use('/api/twofa', twofaRoute)
app.use('/api/carriers', carrierRoute)
app.use('/api/addresses', addressRoute)
app.use('/api/manufacturers', manufacturerRoute)

app.get('/', (req, res) => {
    res.send('Hello from TypeScript!')
})
app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!')
})

Sentry.setupExpressErrorHandler(app)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
