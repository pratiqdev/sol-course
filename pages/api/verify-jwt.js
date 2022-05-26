// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken'

export default function handler(req, res) {
    const jwtSecret = process.env.JWT_SECRET
    const { token, address } = req.body

    if(!jwtSecret){
        res.status(500).json('No secret found in env!')
        return
    }

    if(!token){
        res.status(500).json('Must supply a token to verify jwt. Recieved:' + token)
        return
    }

    if(!address){
        res.status(500).json('Must supply an address to verify jwt. Recieved:' + address)
        return
    }


    try {
        const decoded = jwt.verify(token, jwtSecret);
        // console.log('verifyJwt | decodedAddress:', decodedAddress)
        if(address === decoded.address){
            console.log('verfiy-jwt | address matched!')
            res.status(200).json({verified: true, address, reason: 'verified',  msg: 'Verified!'})
        }else{
            console.log('verfiy-jwt | address does not match')
            res.status(200).json({verified: false, address, reason: 'no-match', msg: `Address does not match` })
        }
    } catch (err) {
        if(err.toString().includes('TokenExpiredError')){
            res.status(200).json({verified: false, address, reason: 'expired', msg: 'The token has expired'})
        }else{
            return res.status(401).json({verified: false, address, reason: 'error a67df9', msg: 'Could not verify token:' + err});
        }
    }
}
  