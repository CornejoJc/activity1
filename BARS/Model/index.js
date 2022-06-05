//Enables express module
const express = require (`express`);

const port = `3000`

//Links the router js files
const upload = require (`./upload/upload`);

const app = express();

//parces JSON data
app.use(express.json());

//Uses the router for db
app.listen(3000,() => {
    console.log(`Server is up on port $(port)`);
});

