const prisma = require('./database')
const jwt = require('jsonwebtoken')

const userSession = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, 'jwt-secret-code')

            const user = await prisma.user.findUnique({
                where: { id: decoded.id }
            })

            if(user){
                req.user = {
                    id: user.id,
                    email: user.email
                }
                next()
            }else{
                res.status(403).send({
                    status: false,
                    error: "Not authorized"
                })
            }
        }catch(error){
            console.log('userSession middleware helper error: ', error);

            res.status(403).send({
                status: false,
                error: "Not authorized"
            })
        }
    }

    if(!token){
        res.status(401).send({
            status: false,
            error: "Not authorized, no token"
        })
    }
}

module.exports = userSession