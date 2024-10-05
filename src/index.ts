import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import projectRoutes from './routes/projectRoutes'
import taskRoutes from './routes/taskRoutes'
import searchRoutes from './routes/searchRoutes'
import userRoutes from './routes/userRoutes'
import teamRoutes from './routes/teamRoutes'


// configurations
dotenv.config();
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(express.static('public'))


app.get('/test', (req, res) => {
	res.send('Hello World')
})

app.use("/projects", projectRoutes)
app.use("/tasks", taskRoutes)
app.use("/search", searchRoutes)
app.use("/users", userRoutes)
app.use("/teams", teamRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})