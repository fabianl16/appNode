const songRouter    = require('./song.router');
const authRouter    = require('./auth.router');
const tagRouter     = require('./tag.router');
const reviewRouter  = require('./review.router');
const userRouter    = require('./user.router');

function routerApi(app) {
    app.use('/song', songRouter);
    app.use('/auth', authRouter);
    app.use('/tag', tagRouter);
    app.use('/review', reviewRouter);
    app.use('/user', userRouter);
}
module.exports = routerApi;