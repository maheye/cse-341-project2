const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API documentation for Project 2',
    },
    host: 'project2-u3gt.onrender.com',
    schemes: ['https'],

};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js',
    './routes/users.js', 
    './routes/blogs.js', 
    './routes/comments.js', 
];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);