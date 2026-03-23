const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', aiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
