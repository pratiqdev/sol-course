import { useState, useEffect } from 'react'
import CONSTANTS from '@utils/constants'
import axios from 'axios'
import { useUserContext } from '@utils/context'
import connectionManager from '@utils/connection'

const ProtectedRoute = (props) => {
    const [verified, setVerified] = useState(false)
    const [expired, setExpired] = useState(false)
    const {ctx, setCtx} = useUserContext()
    const { connect, reset } = connectionManager(ctx, setCtx)

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

    if(expired){
        return(
            <>
                <p>Expired: reconnect.  @ {Date.now()}</p>
                <button onClick={connect}>Connect</button>
            </>
        )
    }else if(!verified){
        return(
            <>
                <p>Verify account... @ {Date.now()}</p>
                <button onClick={connect}>Connect</button>
            </>
        )
    }else{
        return(
            <>
                <p>Access granted! @ {Date.now()}</p>
                <button onClick={reset}>Reset</button>
                {props.children}
            </>
        )
    }


}

export default ProtectedRoute