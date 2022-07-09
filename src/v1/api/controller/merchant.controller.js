const merchantModel = require('../model/merchantRegisteration.models.')
const { validationResult } = require('express-validator')
const { randomBytes } = require('crypto')
const { encryption, generateMerchantToken,checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')


module.exports = {
    merchantRegistration: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            } else {

                const merchantId = randomBytes(4).toString('hex')
                const { email, firstName, lastName, mobileNum, password, merchantType } = req.body

                const oldMerchant = await merchantModel.findOne({ email })
                if (oldMerchant) {
                    res.send({ status: false, statusbar: 409, message: "merchant already exist pls try again later" })
                } else {
                    const encryptedPassword = await encryption(password)
                    const data = {
                        merchantId: merchantId,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: encryptedPassword,
                        mobileNum: mobileNum,
                        merchantType: merchantType,
                        isLogin: true
                    }
                    const token = await generateMerchantToken(data)
                    const merchant = await new merchantModel(data)
                    const merchantData = await merchant.save()
                    res.send({ status: true, statusbar: 400, message: "merchant register successfuly", data:token })
                }


            }
        } catch (err) {
            res.send(err.message)

        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            } else {
                const email = req.body.email
                const password = req.body.password

                const merchant = await merchantModel.findOne({email})
                if(!merchant){
                    res.send({status:false,statusbar:400,message:"merchant not exist",error:""})
                }else{
                    if(merchant.isLogin){
                        res.send({ status: true, statusbar:400, message: "User alredy login" })
                    }else{
                    const data = {
                        email:email,
                        password:password
                    }
                    if(await checkEncryption(password,merchant.password)){
            
                            const token = await generateMerchantToken(merchant) 
                            merchant.isLogin = true
                            merchant.save()
                            res.send({ status: true, statusbar: 200, message: "login successful", data: token ,default:true})
                    }
                    else {
            res.send({ status:true, statusbar:409, message: "pls enter valid password" })
          }

                }
            }
            }

        } catch (err) {
            
            res.send(err.message)
        }
    },
    logout: async (req,res) =>{
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            } else {
                 const tokenData = parseJwt(req.headers.authorization)
                const logout = await merchantModel.findOne({merchantId:tokenData.merchantId})
                if (logout.isLogin) {
                    logout.isLogin=false
                    logout.save()
                    res.send({status: true, statusbar: 200, message: "logout successful",})
                } else {
                    badRequest(res,"you need to login first")                    
                }
            }

        }catch(err){
            res.send(err.message)
        }
    },
    getUserById:async (req,res)=>{
        try {
            const error = validationResult(req);
            if (!error.isEmpty) {
                badRequest(res,"bad request");
            } else {
                const tokenData = parseJwt(req.headers.authorization)
                const userData = await merchantModel.findOne({merchantId:tokenData.merchantId});
                if (userData) {
                    success(res,"success",userData);
                } else {
                    badRequest(res,"user not found");
                }
            }
        } catch (error) {
            unknownError(res,"unknown error");
        }
    }

}