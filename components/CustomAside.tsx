import { useState, useEffect } from 'react'
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { Button } from '@mantine/core';


interface ICustomComponentProps {
  categoryUri: string;
  courseUri: string;
  children?: any;
  style?: any;
}
const CustomAside = (props:ICustomComponentProps) => {

  const [width, setWidth] = useState('calc(100vw - 120px)')
  const {ctx, useUriStore} = useConnectionManager()
  const [store, setStore] = useUriStore(props.categoryUri, props.courseUri)
  useEffect(()=>{
    // ctx.instructionsOpen ? ctx.navOpen ? '60vw' : '40vw' : 'calc(100vw - 120px)'
    if(!ctx.navOpen && !ctx.instructionsOpen){
      setWidth('calc(100vw - 120px)')
      console.log('aaa')
    }
    
    if(ctx.navOpen && !ctx.instructionsOpen){
      setWidth('calc(80vw - 60px)')
      console.log('bbb')
    }
    
    if(!ctx.navOpen && ctx.instructionsOpen){
      setWidth('calc(60vw - 60px)')
      console.log('ccc')
    }
    
    if(ctx.navOpen && ctx.instructionsOpen){
      setWidth('40vw')
      console.log('ddd')
    }
  }, [ctx])


  return (
    <div {...props} style={{marginTop: '70px', width: width, minWidth: width, maxWidth: width, height: 'calc(100vh - 70px)', ...props.style  }} >
      {props.children}
      <Button sx={{margin: '5px'}} onClick={()=>setStore((s:any)=>({...s, complete: true}))}>Mark Complete</Button>
      <Button onClick={()=>setStore((s:any)=>({...s, complete: false}))}>Mark Incomplete</Button>
    </div>

  )
}
export default CustomAside