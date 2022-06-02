import { useEffect } from 'react'
import { useUserContext } from "@utils/context";
import axios from 'axios'
import useProgress from '@utils/hooks/useProgress';



const InitialProgressLoader = () => {
    const { ctx, setCtx } = useUserContext()
    const { refresh } = useProgress(ctx.address)



    useEffect(()=>{
        if(ctx.connected && ctx.address){
            console.log('INITIAL PROGRESS LOADER | CONNECTED')
            refresh()
        }
    },[ctx.connected, ctx.address])



    return null
}

export default InitialProgressLoader