import Web3 from 'web3'
import abi from './abi.json'
import axios from 'axios'
import bops from 'bops'
import CONSTANTS from '@data/constants'

interface IVerfifiedDataStruct {
  isHolder: boolean;
  isVerified: boolean;
  message: string;
}
const verifyAddress = async (_address:string): Promise<IVerfifiedDataStruct> => {

  if(!_address){
    console.log('NO ADDRESS TO VERIFY:', _address)
    return {
      isHolder: false,
      isVerified: false,
      message: 'No address to verify...'
    }
  }

  let globalSignature
  const web3 =  new Web3(Web3.givenProvider)
  //@ts-ignore
  const Contract = await new web3.eth.Contract(abi, '0x5955373cc1196fd91a4165c4c5c227b30a3948f9')


  // connect with the api route to generate a jwt
  const generateJWT = async () => {
    let {data} = await axios.post('/api/generate-jwt', {address: _address})
    return data
  }


  const msg = `Welcome to the Chiptos Solidity Course! \n\nVerify your address to access courses and save your progress.`;

  // attempt to sign a message thru metamask
  // does this work thru any provider?
  const signMessage = async () => {
    console.log('verifyAddress | signMessage | provider:', window.ethereum)
    try {
        const from = _address;
        // console.log('from : ' + from);
        // console.log('msg : ' + msg);
        const ethereum = window.ethereum
        const sign = await ethereum.request({
            method: 'personal_sign',
            params: [msg, from, 'Random text'],
        });
        console.log('verifyAddress | signed: ' + sign);
        globalSignature = sign;
    } catch (err) {
        console.error(err);
    }
  }

  // use web3.eth to verify the signature and check the address returned
  // from the verification process against the address passed as arg
  const verifyMessage = async () => {
    try {
        const from = _address;
        const recoveredAddr = web3.eth.accounts.recover(msg, globalSignature);
        console.log('verifyAddress | recoveredAddr : ' + recoveredAddr);

        if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
            console.log(`verifyAddress | Success: ${recoveredAddr}`);
            return _address
        } else {
            console.log(`verifyAddress | Failed to verify message:${recoveredAddr} vs ${from}`,);
            return false
        }
    } catch (err) {
        console.log(`verifyAddress | error:`,err);
        return false

    }
  }
  
  try{
    await signMessage()
    let verifiedAddress = await verifyMessage()

    if(!verifiedAddress){
      console.log('verifyAddress | Address could not be verified')
      return {
        isHolder: false,
        isVerified: false,
        message: 'This address could not be verified...'
      }
    }

    let holderData = await Contract.methods
    .balanceOf(verifiedAddress)
    .call()

    if(parseInt(holderData) >= 1){
        let storageItem = {
          token: await generateJWT(),
          expiration: Date.now() + 7.2e+6
        }
        localStorage.setItem(CONSTANTS.JWT_STORAGE_KEY, JSON.stringify(storageItem))
        // console.log('set localStorage item:', storageItem)
        return {
          isHolder: true,
          isVerified: true,
          message: 'Address verified as ChiptosX owner',
        }
    }else{
      return {
        isHolder: false,
        isVerified: true,
        message: 'This address is not a ChiptosX owner...'
      }
    }
  }catch(err){
    console.log('VERIFY ADDRESS ERROR:',err)
    return {
      isHolder: false,
      isVerified: false,
      message: 'This address could not be verified...'
    }
  }


}

export default verifyAddress