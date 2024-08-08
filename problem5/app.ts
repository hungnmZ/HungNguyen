import dotenv from 'dotenv';
dotenv.config();

import { expressConfig } from '@config/express.config';
import { connectMongoDB } from '@frameworks/database/mongodb/connection';
import express from 'express';

// Connect database
connectMongoDB();

const app = express();

// express.js configuration (middlewares,...)
expressConfig(app);
