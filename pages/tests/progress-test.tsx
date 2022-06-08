import { useGlobalContext } from "@utils/context";
import { useState } from "react";
import useConnectionManager from "@utils/hooks/useConnectionManager";

const ProgressUpdateTester = () => {

    const { 
        ctx, 
        setCtx, 
        
        connect, 
        reset, 
        
        progress, 
        latestCourse, 
        latestCategory, 
        updateProgress, 
        resetProgress,
        refresh, 
        setLatestCategory, 
        setLatestCourse 
    } = useConnectionManager()
    
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
                <button onClick={resetProgress}>Reset Progress</button>
                <button onClick={()=> updateProgress((p:any) =>({...p, 'new-progress':'was updated!!'}))}>Update 1 (cb spread)</button>
                <button onClick={()=> updateProgress(() => ({'new-progress':'was updated again!!'}))}>Update 2 (cb unused)</button>
                <button onClick={()=> updateProgress(() => ({}))}>Update 3 (cb empty)</button>
                <button onClick={()=> updateProgress((p:any) =>({...p, 'test-3':'new tuple'}))}>Update 4 (cb spread)</button>

                <button onClick={()=> updateProgress((p:any) =>
                    ({
                        ...p, 
                        'INTRO': {
                            'GETTING_STARTED':{
                                stat: 'some stat',
                                code: 'some code???'
                            }
                        }
                    })
                )}>Update 5 (code)</button>

                <button onClick={()=> updateProgress((p:any) =>
                    ({
                        ...p, 
                        'INTRO': {
                            ...p['INTRO'],
                            'GETTING_STARTED':{
                                ...p['INTRO']['GETTING_STARTED'],
                                code: 'new code!!'
                            }
                        }
                    })
                )}>Update 6 (code change)</button>


            <button onClick={()=> updateProgress({'reset':'progress'})}>Reset Progress (no cb)</button>
            <button onClick={refresh}>Refresh</button>
            <hr />
            <button onClick={()=>setLatestCategory('one')}>Set Latest Category (one)</button>
            <button onClick={()=>setLatestCategory('two')}>Set Latest Category (two)</button>
            <button onClick={()=>setLatestCourse('alpha')}>Set Latest Course (alpha)</button>
            <button onClick={()=>setLatestCourse('beta')}>Set Latest Course (beta)</button>
            </div>
            <pre>Latest Category: {latestCategory || 'no-category'}</pre>
            <pre>Latest Course: {latestCourse || 'no-course'}</pre>
            <pre>{JSON.stringify(progress || {}, null, 2)}</pre>
        </>
    )
}

export default ProgressUpdateTester