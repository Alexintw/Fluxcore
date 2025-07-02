const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FluxCore API',
      version: '1.0.0',
      description: 'Secure, scalable Node.js API boilerplate',
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

function serveSpec(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
}

module.exports = { swaggerUi, specs, serveSpec };