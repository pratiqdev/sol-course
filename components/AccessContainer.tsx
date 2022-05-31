import { useState, useEffect } from 'react'
import CONSTANTS from '@utils/constants'
import axios from 'axios'
import { useUserContext } from '@utils/context'
import connectionManager from '@utils/connection'
import Shell from '@components/Shell'
import { Button } from '@mantine/core'
import Modal from '@components/Modal'

interface AccessContainerProps {
    restricted?: boolean;
    children?: any;
}

const AccessContainer = (props:AccessContainerProps) => {
    const [verified, setVerified] = useState(false)
    const [expired, setExpired] = useState(false)
    const {ctx, setCtx} = useUserContext()
    const { connect, reset } = connectionManager(ctx, setCtx)
    const [showConnectModal, setShowConnectModal] = useState(true)

    const verifyData = async () => {
        let tokenData = localStorage.getItem(CONSTANTS.JWT_STORAGE_KEY) || null
        console.log('ProtectedRoute | verifyData:', tokenData)

        if(!tokenData){
            console.log('ProtectedRoute | verifyData | No tokenData found:', tokenData)
            setVerified(false)
            return
        }
        const { expiration, token } = JSON.parse(tokenData)

        if(!token){
            console.log('ProtectedRoute | verifyData | No token in tokenData:', token)
            setVerified(false)
            return
        }

        if(!expiration){
            console.log('ProtectedRoute | verifyData | No expiration in tokenData:', expiration)
            setVerified(false)
            return
        }

        if(!ctx.address){
            console.log('ProtectedRoute | verifyData | No address in ctx:', ctx.address)
            setVerified(false)
            return
        }
        // console.log('ProtectedRoute | verifyData | posting with token:', token)
        let {data} = await axios.post('/api/verify-jwt', {token, address: ctx.address})

        console.log(`ProtectedRoute | verifyData | token ${token}, tokenVerified: ${JSON.stringify(data, null, 2)}`)

        if(data.verified && data.reason == 'verified'){
            setVerified(true)
            setExpired(false)
        }
        if(data.reason === 'expired'){
            setExpired(true)
        }
    }

    useEffect(()=>{
        verifyData()
    }, [ctx])

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
                <Modal centered open={showConnectModal} title='Connect a Wallet'>
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