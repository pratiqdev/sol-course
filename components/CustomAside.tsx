import { useState, useEffect } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useGlobalContext } from '@utils/context';


const CustomAside = (props:any) => {

  const [editorContent, setEditorContent] = useState(props.code || 'no-code-props')
  const [width, setWidth] = useState('calc(100vw - 120px)')
  const { ctx, setCtx } = useGlobalContext()

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
    </div>

  )
}
export default CustomAside