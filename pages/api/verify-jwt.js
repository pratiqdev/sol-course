// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const jwtSecret = process.env.JWT_SECRET
    const currentAddress = req.body.address

    if(!jwtSecret){
        console.log('verify-jwt | No secret found in env!')
        res.status(500).json('No secret found in env!')
    }

    if(!currentAddress){
        console.log('Must supply an address to verify jwt')
        res.status(500).json('Must supply an address to verify jwt')
    }


    try {
        const decodedAddress = jwt.verify(token, jwtSecret);
        if(currentAddress === decodedAddress){
            console.log('verfiy-jwt | address matched!')
            res.status(200).json({verfified: true, address: currentAddress, msg: 'match'})
        }else{
            console.log('verfiy-jwt | address does not match')
            res.status(200).json({verfified: false, address: currentAddress, msg: 'no-match'})
        }
    } catch (err) {
        return res.status(401).json({verified: false, address: currentAddress, msg: 'error-verifying-token'});
    }
}
  