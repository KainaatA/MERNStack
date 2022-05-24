import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: './../config.env'});
// console.log(dotenv.config({path: './../config.env'}));

// const generateToken = id => {
//     // console.log('id',id);
//     console.log(process.env.JWT_SECRET,process.env.JWT_EXPIRES_IN);
//     return jwt.sign({id},process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     })
// };

const generateToken = id => {
   
    return jwt.sign({id},'my-ultra-secure-and-ultra-long-secret', {
        expiresIn: '90d'
    })
};

export default generateToken;