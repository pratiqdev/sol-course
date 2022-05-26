// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken'

export default function handler(req, res) {
    const jwtSecret = process.env.JWT_SECRET
    const jwtExpiration = process.env.JWT_EXPIRE_TIME || '1m'
    const { address } = req.body

    if(!jwtSecret){
        console.log('generate-jwt | No secret found in env!')
        res.status(500).json('No secret found in env!')
    }

    if(!address){
        console.log('Must supply an address to generate jwt')
        res.status(500).json('Must supply an address to generate jwt')
    }

    console.log(`generate-jwt | generating token with ${jwtSecret} + ${address}`)
    
    const token = jwt.sign(
        { address },
        jwtSecret,
        {
            expiresIn: jwtExpiration,
        }
    );
    res.status(200).json(token)
}
  