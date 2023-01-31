import useConnectionManager from '@utils/hooks/useConnectionManager';
import Blockies from 'react-blockies';
import { Button } from '@mantine/core'
import { useEffect, useState } from 'react';
import { ellipseAddress } from '@utils/utilities';
export type BlockyProps = {
    wide?: boolean;
    handleConnect?: () => unknown;
}
const Blocky = (props:BlockyProps) => {
    const {ctx, connect, reset} = useConnectionManager()
    const [hasAddress, setHasAddress] = useState(false)
    
    useEffect(  ()=>{
        setHasAddress(ctx.connected && ctx.address)
    },[ctx.address, ctx.connected])

    if(!ctx.connected || !ctx.address){
        return(
            <Button onClick={() => props.handleConnect ? props.handleConnect() : connect} loading={ctx.connecting}>{ctx.connecting ? 'Connecting...' : 'Connect'}</Button>
        )
    }    

    return (
        <Button 
            onClick={reset} 
            loading={ctx.connecting} 
            style={{paddingLeft: '.3rem', background: 'rgb(100,100,100,.4)', borderTopLeftRadius: '1.2rem', borderBottomLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', borderBottomRightRadius: '1.2rem'}}
            variant='subtle'
            leftIcon={
                <Blockies
                    seed={ctx.address} 
                    size={8} 
                    scale={3} 
                    className="identicon" 
                />
            }>
                <span style={{paddingTop: '.25rem'}}>{props.wide ? ctx.address : ellipseAddress(ctx.address || '', 4)}</span>
        </Button>
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