// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Progress from '@schemas/progress'
import dbConnect from '@utils/dbConnect'

export default async function handler(req, res) {
  const { userAddress, newProgress } = req.body

  try{
    await dbConnect()

    const currentStore = await Progress.findOne({userAddress})
    console.log('currentStore:', currentStore)
    
    if(newProgress){
      await Progress.findOneAndUpdate({userAddress},{ 
        progressObject: {...newProgress} 
      })
    }else{
      await Progress.findOneAndUpdate({userAddress},{ 
        progressObject: {} 
      })
    }

    
    res.status(200).json({})

  }catch(err){
    console.log(err)
    res.status(500).json({msg: 'There was an error with this request', err})
  }

}
