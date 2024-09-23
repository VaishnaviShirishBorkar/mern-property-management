import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import propertyRoutes from './routes/property_routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to Mongodb!'))
.catch((error) => console.log('error: ',error));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/property',propertyRoutes);

app.listen(5000,() => console.log('server running on port 3000!'));
