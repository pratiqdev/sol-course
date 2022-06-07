import { useState, useEffect } from 'react'
import CONSTANTS from '@utils/constants'
import axios from 'axios'
import { Button } from '@mantine/core'
import Modal from '@components/Modal'
import useConnectionManager from '@utils/hooks/useConnectionManager'

interface AccessContainerProps {
    restricted?: boolean;
    children?: any;
}


const AccessContainer = (props:AccessContainerProps) => {
    const [verified, setVerified] = useState(false)
    const [expired, setExpired] = useState(false)
    const {ctx, setCtx, connect, reset} = useConnectionManager()
    const [showConnectModal, setShowConnectModal] = useState(true)


    const verifyData = async () => {
        let tokenData = localStorage.getItem(CONSTANTS.JWT_STORAGE_KEY) || null
        console.log('ACCESS | FOUND STORAGE TOKEN:', tokenData)

        if(!tokenData){
            console.log('ACCESS | No tokenData found:', tokenData)
            setVerified(false)
            return
        }
        const { expiration, token } = JSON.parse(tokenData)

        if(!token){
            console.log('ACCESS | No token in tokenData:', token)
            setVerified(false)
            return
        }

        if(!expiration){
            console.log('ACCESS | No expiration in tokenData:', expiration)
            setVerified(false)
            return
        }

        if(!ctx.address){
            console.log('ACCESS | No address in ctx:', ctx.address)
            setVerified(false)
            return
        }
        // console.log('ProtectedRoute | verifyData | posting with token:', token)
        let {data} = await axios.post('/api/verify-jwt', {token, address: ctx.address})

        console.log(`ACCESS | token ${token}, tokenVerified: ${JSON.stringify(data, null, 2)}`)

        if(data.verified && data.reason == 'verified'){
            console.log('ACCESS | VERIFIED')
            setVerified(true)
            setExpired(false)
        }else if(data.reason === 'expired'){
            console.log('ACCESS | EXPIRED')
            setExpired(true)
        }else{
            console.log('ACCESS | DENIED')
            setVerified(false)
            setExpired(false)
        }
    }

    useEffect(()=>{
        verifyData()
    }, [ctx.address])

    if(props.restricted && expired){
        return(
      
                <div style={{
                    width: '100%',
                    height: 'calc(100vh - 70px)',
                    marginTop: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                        <h3>Your session has expired!</h3>
                        <p>Reconnect to your wallet provider to continue...</p>
                        <Button onClick={connect}>Connect</Button>
                </div>
        )
    }else if(props.restricted && !verified){
        return(
   
     
                <div style={{
                    width: '100%',
                    height: 'calc(100vh - 70px)',
                    marginTop: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                        <h3>You must verify your account!</h3>
                        <p>Connect to your wallet provider to verify this address...</p>
                        <Button onClick={connect}>Connect</Button>
                </div>
        )
    }else{
        return(
            <>
                <Modal centered open={showConnectModal && !props.restricted} title='Connect a Wallet'>
                    <p>
                        Course progress will not be saved and advanced courses cannot be accessed without connecting a wallet!
                    </p>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button onClick={connect}>Connect</Button>
                    <Button onClick={()=>setShowConnectModal(false)}>Continue Anonymously</Button>
                    </div>
                </Modal>
                {props.children}
            </>
        )
    }


}

export default AccessContainer