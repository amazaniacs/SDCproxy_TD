require('newrelic');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const proxy = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use(compression());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static(`${__dirname}/public`));

app.use('/products/:id', express.static(path.join(__dirname, 'public')));

// app.use('/restaurants/:id', proxy({target: 'http://ec2-3-92-226-206.compute-1.amazonaws.com/'}));
// app.use('/articles/:id', proxy({target: 'http://ec2-3-92-226-206.compute-1.amazonaws.com/'}));
// app.use('/reviews/:id', proxy({target: 'http://ec2-3-92-226-206.compute-1.amazonaws.com/'}));
app.use('/api/products', proxy({target: 'http://localhost:3000'}));

// app.get('/products/:id', (req, res) => {
//   res.sendFile(`${__dirname}/public/index.html`);
// });

app.get('*', (req, res) => {
  res.redirect('/products/1');
})

app.listen(4020);