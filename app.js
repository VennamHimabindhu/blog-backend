const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Add this line
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogs');

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors());

app.use(express.json());

app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.send('Blog API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
