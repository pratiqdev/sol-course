import { useState, useEffect } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useUserContext } from '@utils/context';
import {
  Button,
  NativeSelect
} from '@mantine/core'


const CustomEditor = (props:any) => {

  const [editorContent, setEditorContent] = useState(props.code || 'no-code-props')
  const [width, setWidth] = useState('calc(100vw - 120px)')
  const { ctx, setCtx } = useUserContext()

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

  const handleCompile = () => {

  }


  return (
    <div style={{marginTop: '70px', width: width, minWidth: width, maxWidth: width, height: 'calc(100vh - 70px)',  }}>
      <Editor
        height="calc(80vh - 70px )"
        defaultLanguage="sol"
        value={editorContent}
        onChange={setEditorContent}
        theme={'vs-dark'}
        /> 
        <div style={{height: '20vh', display: 'flex', flexDirection: 'column', border: '1px solid green'}}>
          <div>
            <Button size='xs' variant='outline' onClick={handleCompile}>Compile</Button>
            <Button size='xs' variant='outline' onClick={()=> setEditorContent(props.code)}>Reset</Button>
          </div>
        <pre>Output from errors and compilation</pre>
        </div>
    </div>

  )
}
export default CustomEditor