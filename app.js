const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ CORS middleware
const helmet = require('helmet'); // ✅ Helmet for secure headers
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth'); // ✅ add auth routes

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Enable Helmet (Security)
app.use(helmet());

app.use(express.json());

// ✅ Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes); // ✅ mount auth routes

app.get('/', (req, res) => {
  res.send('Blog API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
