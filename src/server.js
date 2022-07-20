const express = require('express')
const fileupload = require('express-fileupload')
const userRouter = require('./routers/user.router')
const postRouter = require('./routers/post.router')
const commentRouter = require('./routers/comment.router')
const likeRouter = require('./routers/like.router')
const checkToken = require('./middleware/checkToken')

const app = express()

app.use(express.json())
app.use(fileupload())
app.use(checkToken)

app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)
app.use(likeRouter)

app.use((error, req, res, next) => {
    return res.send({ error: error.error?.message || "somethink went wrong"})
})

app.listen(5000 || process.env.PORT, () => {
    console.log('server is run');
})