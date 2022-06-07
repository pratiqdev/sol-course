import {useState, useRef, useEffect} from 'react'
    
/**
 * useStable()
 * ---
 * 
 * useEffect hook that doesn't run on the first call
 * 
 * @param {string} key - the key for the storage item
 * @param {any} initialValue - initial state value
 * @param {function} get - the function used to get the value
 * @param {function} set - the function used to set the value
 * @returns void
 * 
 * @example
 * 
 */

const useStable = (initialValue: any, key: string | undefined) => {
    
    

    const [trigger, setTrigger] = useState(false)
    
    const value = useRef(initialValue)
    let storage:any = null
    


    const setValue = (newValue: any) => {
        if(storage){
            key && storage.setItem(key, JSON.stringify(newValue))
        }
            value.current = newValue
            setTrigger(!trigger)
    }

    const remove = () => { 
        if(storage){
            key && storage.removeItem(key) 
        }
            setTrigger(!trigger)
    }

    const reset = () => {
        if(storage){
            key && storage.setItem(key, JSON.stringify(initialValue))
        }
            value.current = initialValue
            setTrigger(!trigger)
    }

    useEffect(()=>{
        if(window && window.localStorage){
            storage = window.localStorage
        }
    }, [])

    useEffect(()=>{
        let jsonValue

        if(key){
            jsonValue = storage.getItem(key)
            if(jsonValue){
                value.current = JSON.parse(jsonValue)
                console.log('useStable | Set value from storage:', JSON.parse(jsonValue))
            }
        }else{
            
            if (typeof initialValue === 'function'){
                value.current = initialValue()
                key && storage.setItem(key, JSON.stringify(initialValue()))
            }else{
                value.current = initialValue 
                key && storage.setItem(key, JSON.stringify(initialValue))
            }
        }
        setTrigger(!trigger)
    }, [key, initialValue, storage])

    return [value.current, setValue, reset, remove]
}

export default useStable