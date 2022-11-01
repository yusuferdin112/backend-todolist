//module berisi fungsi2 yang berkaitan dengan query database
const prisma = require('../helpers/database')

class _user{
    listUser = async () => {
        try {
            const list = await prisma.user.findMany()
            console.log(list);
            return{
                status: true,
                data: list
            }
        }catch(e){
            console.log('listUser user module error', e);
            return{
                status: false,
                e
            }
        }
    }
}

module.exports = new _user()