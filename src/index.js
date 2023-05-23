// File: src/index.js

const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  const html = `
    <html>
      <head>
        <style>
          body {
            background-color: red;
          }
        </style>
      </head>
      <body>
        <h2>Matey e pi4!</h2>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

