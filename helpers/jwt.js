const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {


    return new Promise((resolve,reeject) => {

        const payload = { uid }

        jwt.sign(payload,process.env.JWT_KEY,{
            //expiresIn:'24h'
        },(err,token ) => {
    
            if (err){
                reeject('No se pudo generar el JWT');
            }
            else
            {
                resolve( token );
            }   
    
        });

    });  


}


const comprobarJWTPorSocketIO = (token = '') => {

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
       // req.uid = uid;

       return [true, uid];

    } catch (error) {
        return [false,null];
    
    }
        
}




module.exports = {
    generarJWT,
    comprobarJWTPorSocketIO
}