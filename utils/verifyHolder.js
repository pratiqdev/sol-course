import Web3 from 'web3'
import abi from '../utils/abi.json'
import axios from 'axios'

const verifyHolder = async (_address) => {

  const web3 =  new Web3(Web3.givenProvider)
  const Contract = await new web3.eth.Contract(abi, '0x5955373cc1196fd91a4165c4c5c227b30a3948f9')


  const generateJWT = async () => {
    let {data} = await axios.post('/api/generate-jwt', {address: _address})
    return data
  }
  
  try{

    let holderData = await Contract.methods
    .usedAddresses(_address)
    .call()

    if(holderData === '1'){
        return {
          isHolder: true,
          token: await generateJWT(),
          message: '',
        }
    }else{
      return {
        isHolder: false,
        token: 'not-valid-holder',
        message: 'This address is not a ChiptosX owner...'
      }
    }
  }catch(err){
    console.log(err)
    return {
      isHolder: false,
      token: 'error-validating-holder',
      message: 'This address is not a ChiptosX owner...'
    }
  }


}

export default verifyHolder