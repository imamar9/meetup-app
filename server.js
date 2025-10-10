const express = require('express');
const cors = require('cors');
const { getEvents, getEventById } = require('./src/data'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/events', (req, res) => {
  res.json(getEvents());
});

app.get('/api/events/:id', (req, res) => {
  const event = getEventById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
