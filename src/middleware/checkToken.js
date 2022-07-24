const jwt = require('../utils/jwt')

function checkToken(req, res, next){
    try {
        if(req.url == '/login' || req.url == '/register') return next()
        
        let token = req.headers.token
        if(!token) throw new Error('token yoq')
        
        token = jwt.verify(token)
        next()
    } catch (error) {
        next({error: {
            message: error.message || 'token yoq yoki notogri'
        }})
    }
}

module.exports = checkToken