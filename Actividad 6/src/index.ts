import express from 'express';
import dotenv from "dotenv"
import cors from 'cors';
// import the sagger lib
import swaggerUi from 'swagger-ui-express';
import fs from 'fs'
//db
import connectToDB from "./db/mongodb/mongo.connector";


dotenv.config()

const app = express();
app.use(express.json())
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.set('view engine', 'ejs');
/* Swagger files start */
const swaggerFile: any = ("src/swagger/swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const customCss: any = fs.readFileSync(("src/swagger/swagger.css"), 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
/* Swagger files end */


//connect to db
connectToDB().catch(err => console.log(err));
const port = process.env.PORT


//routers
import { routerNoticias } from './routes/noticias.router'
import { routerApiPeriodistas } from './routes/api/api.periodistas.router'
import { routerApiNoticias } from './routes/api/api.noticias.router'

app.use('/noticias',routerNoticias)
app.use('/api/periodistas',routerApiPeriodistas)
app.use('/api/noticias',routerApiNoticias)
app.use('/api/docs', swaggerUi.serve,
            swaggerUi.setup(swaggerDocument, undefined, undefined, customCss));

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});