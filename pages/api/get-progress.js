// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Progress from '@schemas/progress'
import dbConnect from '@utils/dbConnect'

export default async function handler(req, res) {
  const { userAddress } = req.body

  try{
    await dbConnect()
    let currentProgress = await Progress.findOne({ userAddress })

    if(currentProgress){
      res.status(200).json(currentProgress)
    }else{
        await Progress.create({ 
          userAddress, 
          progressObject: {} 
        })
        
        res.status(200).json({})
    }
  }catch(err){
    console.log(err)
    res.status(500).json({msg: 'There was an error with this request', err})
  }

}
