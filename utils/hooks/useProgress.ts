import { useState, useEffect } from 'react'
import axios from 'axios'
import Progress from '@schemas/progress'

const useProgress = (userAddress: string) => {
    const [progress, setProgress] = useState<any>({})
    const [latestCategoryState, setLatestCategoryState] = useState<any>()
    const [latestCourseState, setLatestCourseState] = useState<any>()
    const [refreshTrigger, setRefreshTrigger] = useState(false)

    const refresh = () => userAddress && setRefreshTrigger(b => !b)

    const reset = () => {
        setProgress({})
        setRefreshTrigger(b => !b)
    }

    const updateProgress = async (cb: any) => {
        if(!userAddress) return
        try{
            if(typeof cb === 'function'){
                console.log('cb function?')
                const progressObject = cb(progress)
                await axios.post('/api/set-progress', {userAddress, data:{progressObject}})
            }else{
                console.log('reset?')
                await axios.post('/api/set-progress', {userAddress, data:{progressObject: cb}})
            }
            refresh()
        }catch(err){
            console.log(err)
        }
    }

    const setLatestCategory = async (category: string) => {
        if(!userAddress) return
        try{
            console.log('setLatestCategory:', category)
            await axios.post('/api/set-progress', {userAddress, data:{latestCategory: category}})
            refresh()
        }catch(err){
            console.log(err)
        }
    }

    const setLatestCourse = async (course: string) => {
        if(!userAddress) return
        try{
            console.log('setLatestCourse:', course)
            await axios.post('/api/set-progress', {userAddress, data:{latestCourse: course}})
            refresh()
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        (async () => {
            if(userAddress){
                const { data } = await axios.post('/api/get-progress', {userAddress})
                setProgress(data.progressObject)
                setLatestCategoryState(data.latestCategory)
                setLatestCourseState(data.latestCourse)
            }
        })()
    }, [userAddress, refreshTrigger])

    return {
        progress,
        refresh,
        reset,
        updateProgress,
        setLatestCategory,
        setLatestCourse,
        latestCategory: latestCategoryState,
        latestCourse: latestCourseState,
    }
}

export default useProgress