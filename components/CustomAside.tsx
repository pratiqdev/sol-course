import { useState, useEffect } from 'react'
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks'


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
  const isMobile = useMediaQuery('(max-width: 992px)');

  useEffect(()=>{
    if(isMobile){
      setWidth('100%')
    }else{
      if(!ctx.navOpen && !ctx.instructionsOpen) setWidth('calc(100vw - 120px)')
      if(ctx.navOpen && !ctx.instructionsOpen) setWidth('calc(80vw - 60px)')
      if(!ctx.navOpen && ctx.instructionsOpen) setWidth('calc(60vw - 60px)')
      if(ctx.navOpen && ctx.instructionsOpen) setWidth('40vw')
    }
  }, [ctx, isMobile])


  return (
    <div {...props} style={{marginTop: isMobile ? '0px' : '70px', width: width, minWidth: width, maxWidth: width, height: 'calc(100vh - 70px)', ...props.style  }} >
      {props.children}
      <Button sx={{margin: '5px'}} onClick={()=>setStore((s:any)=>({...s, complete: true}))}>Mark Complete</Button>
      <Button onClick={()=>setStore((s:any)=>({...s, complete: false}))}>Mark Incomplete</Button>
    </div>

  )
}
export default CustomAside