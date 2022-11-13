const express = require('express');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {
    console.log("Sync Database.");
    runServer()
})


const runServer = async () => {

    app.use(express.json());

    //Links Route
    const linkRouter = require('./routes/link.route');
    app.use('/api-homepage/link', linkRouter);

    //Tags Route
    const tagRouter = require('./routes/tag.route');
    app.use('/api-homepage/tag', tagRouter);

    //User Route
    const userRouter = require('./routes/user.route');
    app.use('/api-homepage/user', userRouter);

    app.listen(3000, () => console.log('Server Started'));
};