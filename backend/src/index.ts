import express from 'express';
import cors from 'cors';
import { firebaseAuth } from './middleware/firebaseAuth';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
import { signupRoute } from './controllers/auth/signupRoute';
import { signinRoute } from './controllers/auth/signinRoute';
import { genOtpRoute } from './controllers/auth/genOtpRoute';
import { verifyOtp } from './controllers/auth/verifyOtp';
import { signoutRoute } from './controllers/auth/signoutRoute';
import { userRoute } from './controllers/auth/userRoute';
import { itenaryRoute } from './controllers/itenaryRoute';
import { summarizeRoute } from './controllers/summarizeRoute';
import { queryRoute } from './controllers/queryRoute';
import { itenarariesRoute } from './controllers/itenarariesRoute';
import { serverAuthMiddleware } from './middleware/serverAuthMiddleware';
import { summaryRoute } from './utils/summaryRoute';
dotenv.config();
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing middleware

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Google-Auth', 'SERVER-API-KEY'], // Add X-API-KEY
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/signup', signupRoute);

app.post('/signin', firebaseAuth, signinRoute);

app.post('/generate-otp', genOtpRoute);

app.post('/verify-otp', verifyOtp);

app.post('/api/auth/signout', signoutRoute)

app.get("/api/auth/user", authMiddleware, userRoute)

app.post('/api/summarize',serverAuthMiddleware, summarizeRoute)

app.use(authMiddleware);//use auth middleware for all routes after this line 

app.post('/api/itenary', itenaryRoute)
app.get('/api/itineraries', itenarariesRoute)
app.post('/query', queryRoute)
app.get('/api/summarize', summaryRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


