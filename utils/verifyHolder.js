import Web3 from 'web3'
import abi from '../utils/abi.json'

const verifyHolder = async (_address) => {

  const web3 =  new Web3(Web3.givenProvider)
  const Contract = await new web3.eth.Contract(abi, '0x5955373cc1196fd91a4165c4c5c227b30a3948f9')


  const generateJWT = () => {
    return 'abcd1234'
  }
  
  
  let holderData = await Contract.methods
  .usedAddresses(_address)
  .call()
  .then(data => {
      if(data === '1'){
          return {
              isHolder: true,
              token: generateJWT(),
              message: '',
          }
      }else{
          return {
              isHolder: false,
              token: 'not-valid-holder',
              message: 'This address is not a ChiptosX owner...'
          }
      }
  })
  .catch(err => {
    console.log(err)
    return {
      isHolder: false,
      token: 'error-validating-holder',
      message: 'This address is not a ChiptosX owner...'
  }
  })




    return holderData
  }

export default verifyHolder