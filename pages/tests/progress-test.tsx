import { useGlobalContext } from "@utils/context";
import { useState } from "react";
import useConnectionManager from "@utils/hooks/useConnectionManager";

const ProgressUpdateTester = () => {

    const { 
        ctx,
        connect, 
        reset, 
    
        // getCategoryStoreByUri,
        // getCourseStoreByUri,
        // getRootStore,
        useUriStore,
    } = useConnectionManager()

    const [store, setStore] = useUriStore('intro', 'standard-qa')

    
    return(
        <>
            <h2>Progress Update Tester</h2>
            <div className="quik-menu">
                <button onClick={connect}>Connect</button>
                <button onClick={reset}>Reset</button>
            </div>
            <pre>{ctx.address || 'not-connected'}</pre>
            <hr />

            <div className="quik-menu">
                {/* <button onClick={resetProgress}>Reset Progress</button> */}
                <button onClick={()=>setStore((s:any) => ({...s, 'newState':'here'}))}>Set Progress</button>
                <button onClick={()=>setStore((s:any) => s)}>Check Progress</button>
            </div>
   
            <pre style={{fontSize: '.6rem'}}>{JSON.stringify({...store}, null, 2)}</pre>
        </>
    )
}

export default ProgressUpdateTester