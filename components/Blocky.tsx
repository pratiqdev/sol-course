import useConnectionManager from '@utils/hooks/useConnectionManager';
import Blockies from 'react-blockies';
import { Button } from '@mantine/core'
import { useEffect, useState } from 'react';
 
const Blocky = () => {
    const {ctx} = useConnectionManager()
    const [hasAddress, setHasAddress] = useState(false)
    
    useEffect(  ()=>{
        if(!ctx.connected || !ctx.address){
            setHasAddress(true)
        }
    },[ctx.address, ctx.connected])

    if(!hasAddress){
        return(
            <Button>Connect#</Button>
        )
    }    

    return (
        <Blockies
            seed={ctx.address} 
            size={10} 
            scale={3} 
            color="#dfe" 
            bgColor="#ffe" 
            spotColor="#abc" 
            className="identicon" 
        />
    )
}

export default Blocky

/*
       <Blockies
            seed={ctx.address} {/* the only required prop; determines how the image is generated 
            size={10} {/* number of squares wide/tall the image will be; default = 15 
            scale={3} {/* width/height of each square in pixels; default = 4 
            color="#dfe" {/* normal color; random by default 
            bgColor="#ffe" {/* background color; random by default 
            spotColor="#abc" {/* color of the more notable features; random by default 
            className="identicon" {/* optional class name for the canvas element; "identicon" by default 
        />
*/