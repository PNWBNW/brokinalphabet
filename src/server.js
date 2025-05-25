const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const llmRouter = require('./routes/llmRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', llmRouter);

app.listen(PORT, () => {
  console.log(`BroKinAlphaBet backend running on port ${PORT}`);
});
