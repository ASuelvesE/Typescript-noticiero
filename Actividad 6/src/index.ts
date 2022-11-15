import express from 'express';
import dotenv from "dotenv"
import cors from 'cors';

dotenv.config()

const app = express();
app.use(express.json())
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

const port = process.env.PORT

//routers
import { routerNoticias } from './routes/noticias.router'

app.use('/noticias',routerNoticias)

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});