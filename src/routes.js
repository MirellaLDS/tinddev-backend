const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = express.Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "TinDev",
          description: "Clone do Tinder para desenvolvedores. \n Uma aplicação que permite que desenvolvedores encontrem parceiros de trabalho através de seus perfis do GitHub. \n Após fazer login o desenvolvedor pode dar 'like' e 'dislikes' em outros desenvolvedores, quando um dois desenvolvedores dão like um no outro temos um 'Match' e então os dois são avisados.",
          contact: {
            name: "Mirella Lins"
          }
        },
        servers: [
            {
              url: "http://localhost:3333"
            }
          ]
    },
    apis: ["./src/models/*.js", "./src/routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const options = {
    explorer: true
};

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocs, options));

routes.get('/', (req, res) => {
    return res.json({menssagem: `Oi ${req.query.name}`});
});

/**
 * @swagger
 * tags:
 *   name: Devs
 *   description: Dev management
 */

/**
 * @swagger
 * /devs/all/:
 *  get:
 *    summary: Use to request all Devs
 *    tags: [Devs]  
 *    description: Use to request all Devs
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items: 
 *                      $ref: '#/components/schemas/Dev'
 */
routes.get('/devs/all', DevController.findAll);

/**
 * @swagger
 * tags:
 *   name: Devs
 *   description: Dev management
 */

/**
 * @swagger
 * /devs/:
 *  get:
 *    summary: Get user by ID
 *    tags: [Devs]  
 *    description: Get an user by internal ID
 *    parameters:
 *        - in: header
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Dev'
 */
routes.get('/devs', DevController.index);

/**
 * @swagger
 * /devs/:
 *  post:
 *    summary: Create a new user
 *    tags: [Devs]  
 *    description: Create a new user
 *    requestBody:
 *        required: true  
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/DevRequestBody'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Dev'
 */
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);


routes.get('/devs/profile', DevController.getByname);

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.get("/customers", (req, res) => {
    res.status(200).send("Customer results");
  });

module.exports = routes;