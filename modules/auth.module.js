const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

class _auth{
    login = async (body) => {
        try{
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required()
            })

            const validation = schema.validate(body)
            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            //cari user dengan email
            const user = await prisma.user.findFirst({
                where: {
                    email: body.email
                }
            })

            //kalau user tidak ada, return error
            if(!user){
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            //kalau user ada, cek password     
            if(!bcrypt.compareSync(body.password, user.password)){
                return {
                    status: false,
                    code: 401,
                    error: 'Password is incorrect'
                }
            }   

            const payload = {
                id: user.id,
                email: user.email
            }
            const token = jwt.sign(payload, 'jwt-secret-code', { expiresIn: "8h" })
            
            return {
                status: true,
                data: {
                    token
                }
            }
        }catch(error){
            console.error('Login auth module error', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _auth()