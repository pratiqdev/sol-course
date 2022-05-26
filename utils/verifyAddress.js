import Web3 from 'web3'
import abi from './abi.json'
import axios from 'axios'
import bops from 'bops'
import CONSTANTS from '@utils/constants'

const verifyAddress = async (_address) => {

  let globalSignature
  const web3 =  new Web3(Web3.givenProvider)
  const Contract = await new web3.eth.Contract(abi, '0x5955373cc1196fd91a4165c4c5c227b30a3948f9')
  const message = 'Message used for signature'


  // connect with the api route to generate a jwt
  const generateJWT = async () => {
    let {data} = await axios.post('/api/generate-jwt', {address: _address})
    return data
  }



  // attempt to sign a message thru metamask
  // does this work thru any provider?
  const signMessage = async () => {
    try {
        const from = _address;
        console.log('from : ' + from);
        const msg = `0x${bops.from(message, 'utf8').toString('hex')}`;
        console.log('msg : ' + msg);
        const sign = await ethereum.request({
            method: 'personal_sign',
            params: [msg, from, 'Random text'],
        });
        console.log('signed: ' + sign);
        globalSignature = sign;
    } catch (err) {
        console.error(err);
    }
  }

  // use web3.eth to verify the signature and check the address returned
  // from the verification process agains the address passed as arg
  const verifyMessage = async () => {
    try {
        const from = _address;
        const msg = `0x${bops.from(message, 'utf8').toString('hex')}`;
        const recoveredAddr = web3.eth.accounts.recover(msg, globalSignature);
        console.log('recoveredAddr : ' + recoveredAddr);

        if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
            console.log(`Success: ${recoveredAddr}`);
            return _address
        } else {
            console.log(`Failed:${recoveredAddr} vs ${from}`,);
            return null
        }
    } catch (err) {
        console.error(err);
    }
  }
  
  try{
    await signMessage()
    let verifiedAddress = await verifyMessage()

    if(!verifiedAddress){
      console.log('Address could not be verified')
      return {
        isHolder: false,
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
        console.log('set localStorage item:', storageItem)
        return {
          isHolder: true,
          message: 'Address verified as ChiptosX owner',
        }
    }else{
      return {
        isHolder: false,
        message: 'This address is not a ChiptosX owner...'
      }
    }
  }catch(err){
    console.log(err)
    return {
      isHolder: false,
      message: 'This address could not be verified...'
    }
  }


}

export default verifyAddress