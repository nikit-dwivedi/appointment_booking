const{body} = require('express-validator')
exports.validateRegister = (method)=>{
         switch(method){
            case 'Register':{
                return[
                    body('email','email is Invalid').not().isEmpty().trim().isEmail().escape(),
                    body('password','password is invalid').not().isEmpty().trim().isAlphanumeric().isLength({min:6}),
                ]
            }
         }
}