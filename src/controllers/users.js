import UserModel from "../models/users";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {keys} from "../config/keys";

class UserController {
    async create(req, res) {
        const candidate = await UserModel.findOne({email: req.body.email})
        if (candidate) {
            res.status(409).json({message: 'Conflict'})
        } else {
            const data = {
                fullname: req.body.fullname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            }
            const user = new UserModel(data)
            await user.save().then((obj) => {
                const token =jwt.sign({
                    email: user.email,
                    userId: user._id}, keys.jwt, {expiresIn: 60*60})
                res.status(200).json({
                    userData: {
                        fullname: user.fullname,
                        email: user.email,
                        basket: user.basket,
                        own: user.own
                    },
                    token: token
                });
            }).catch((e) => {
                res.status(404).json({
                    messange: e
                })
            })
        }
    }
    async login(req, res) {
        const candidate = await UserModel.findOne({email: req.body.email})
        const pass = bcrypt.hashSync("ananas24@gmail.com")
        console.log(pass)
        if (candidate) {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if(passwordResult) {
               const token =jwt.sign({
                   email: candidate.email,
                   userId: candidate._id
               }, keys.jwt, {expiresIn: 60*60})
                res.status(200).json({
                    userData: {
                        fullname: candidate.fullname,
                        email: candidate.email,
                        basket: candidate.basket,
                        own: candidate.own
                    },
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "password is not compare"
                })
            }
        } else  {
           res.status(404).json({
               message: "users does not exist "
           })
        }
    }
    verify(req, res) {
        const authHeader = req.headers.authorization
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        if (token == null) return res.status(401)

            jwt.verify(token, keys.jwt, '', async (err, user) => {
                if (user) {
                    console.log(user)
                    const userData = await UserModel.findOne({_id: user.userId})
                    res.status(200).json({
                        userData
                    })
                }
                if (err) {
                    res.status(404).json({
                        message: 'Token is not invalid'
                    })
                }
            })

    }

    delete(req, res) {
        const id = req.params.id;
        UserModel.findByIdAndDelete(id).then(user => {
            if (user) {
                res.json({
                    user: user.fullname + " remove"
                });
            } else {
                res.json({
                    user: "Error"
                });
            }
        }).catch(() => {
            res.status(404).json({
                messange: "not remove"
            })
        })

    }
}

export default UserController