import connectionManager from "@utils/connection";
import { useUserContext } from "@utils/context";
import { useState } from "react";
import useProgress from '@utils/hooks/useProgress'

const ProgressUpdateTester = () => {

    const { ctx, setCtx } = useUserContext()
    const { connect, reset } = connectionManager(ctx, setCtx)
    const { progress, latestCourse, latestCategory, updateProgress, refresh, setLatestCategory, setLatestCourse } = useProgress(ctx.address)
    
    return(
        <>
            <h2>Progress Update Tester</h2>
            <button onClick={connect}>Connect</button>
            <button onClick={reset}>Reset</button>
            <pre>{ctx.address || 'not-connected'}</pre>
            <hr />
            <button onClick={()=> updateProgress((p:any) =>({...p, 'new-progress':'was updated!!'}))}>Update 1 (cb spread)</button>
            <button onClick={()=> updateProgress(() => ({'new-progress':'was updated again!!'}))}>Update 2 (cb unused)</button>
            <button onClick={()=> updateProgress(() => ({}))}>Update 3 (cb empty)</button>
            <button onClick={()=> updateProgress({'reset':'progress'})}>Reset Progress (no cb)</button>
            <button onClick={refresh}>Refresh</button>
            <hr />
            <button onClick={()=>setLatestCategory('blips')}>Set Latest Category (blips)</button>
            <pre>Latest Category: {latestCategory || 'no-category'}</pre>
            <pre>Latest Course: {latestCourse || 'no-course'}</pre>
            <pre>{JSON.stringify(progress || {}, null, 2)}</pre>
        </>
    )
}

export default ProgressUpdateTester