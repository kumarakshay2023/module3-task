const express = require('express');
const app = express();
const port = 3000;
const taskRouter = require('./src/routes/task.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',taskRouter)

app.use((err, req, res, next) => {
    res.status(err.statusCode||500).json({
        status:false,
        statusCode:err.statusCode||500,
        message:err.message
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;