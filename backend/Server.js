import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connection } from './DB/Connection.js';
import router from './Routes/AuthRoutes.js';
import adminRoutes from './Routes/AdminRoutes.js';
import propertyRoutes from './Routes/PropertyRoutes.js';
import clientRoutes from './Routes/ClientRoutes.js';
import leadRoutes from './Routes/LeadRoutes.js';
import dealRoutes from './Routes/DealRoutes.js';
import visitRoutes from './Routes/VisitRoutes.js';


dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3100'],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', router);
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/visits', visitRoutes);


// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
    connection();
});