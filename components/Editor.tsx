import { useState, useEffect } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useUserContext } from '@utils/context';
import {
  Button,
  NativeSelect,
  Group,
  MediaQuery
} from '@mantine/core'
import axios from 'axios';
import compile from '@utils/solc-compile-fe'


const CustomEditor = (props:any) => {

  const [editorContent, setEditorContent] = useState(props.code || 'no-code-props')
  const [editorErrors, setEditorErrors] = useState('You must compile your code first...')
  const [compiledOutput, setCompiledOutput] = useState('You must compile your code first...')
  const [showEditor, setShowEditor] = useState(true)
  const [width, setWidth] = useState('calc(100vw - 120px)')
  const { ctx, setCtx } = useUserContext()

  useEffect(()=>{
    // ctx.instructionsOpen ? ctx.navOpen ? '60vw' : '40vw' : 'calc(100vw - 120px)'
    if(!ctx.navOpen && !ctx.instructionsOpen){
      setWidth('calc(100vw - 120px)')
    }
    
    if(ctx.navOpen && !ctx.instructionsOpen){
      setWidth('calc(80vw - 60px)')
    }
    
    if(!ctx.navOpen && ctx.instructionsOpen){
      setWidth('calc(60vw - 60px)')
    }
    
    if(ctx.navOpen && ctx.instructionsOpen){
      setWidth('40vw')
    }
  }, [ctx])

  const handleCompile = async () => {
    setEditorErrors('Compiling code...')

    const response = await axios.post('/api/solc-compile', {code: editorContent})
    // const response = await compile(editorContent)

    if(response.data.success){
      // console.log('compile success:', response.data)
      // console.log('compiled output:', JSON.stringify(JSON.parse(response.data.output), null, 2))
      let output = JSON.parse(response.data.output)
      let numErrors = 0
      if(output.errors && output.errors.length) numErrors = output.errors.length

      let errorContent = `Compiled with version: ${response.data.version.split('+')[0].split('-v')[1]}\n${numErrors ? `${numErrors} ${numErrors > 1 ? 'errors' : 'error'}:\n\n` : 'No errors\n\n'}`
      if(output.errors && output.errors.length){
        output.errors.forEach((x:any, i:number) => {
          errorContent += `${'-'.repeat(100)}\nERROR ${i+1}: ${x.formattedMessage.replace('--> code.sol:', '')}`
        })
      }
      if(output.contracts){
        setCompiledOutput(JSON.stringify(output.contracts['code.sol'], null, 2))
      }else{
        setCompiledOutput('Errors during compilation...')
      }
      setEditorErrors(errorContent)
    }else{
      console.log(response)
    }
  }


  return (
    <>
      <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>

      <div style={{marginTop: '70px', width: width, minWidth: width, maxWidth: width, height: 'calc(100vh - 70px)',  }}>
        {showEditor
        ? <Editor
        height="calc(70vh - 70px )"
        defaultLanguage="sol"
        value={editorContent}
        onChange={setEditorContent}
        theme={'vs-dark'}
        /> 
        : <pre style={{fontSize: '.8rem', maxHeight: "calc(70vh - 70px)", height:"calc(80vh - 70px)", margin: '0', overflow: 'auto' }}>{compiledOutput}</pre>
      }
          <div style={{height: '3vh', display: 'flex', justifyContent: 'space-between' }}>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='lime' onClick={handleCompile}>Compile</Button>
              <Button size='xs' variant='filled' color='gray'  onClick={()=>setShowEditor(s =>!s)}>{showEditor ? 'Show Compiled' : 'Show Editor'}</Button>
            </Group>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='red'  onClick={()=> setEditorContent(props.code)}>Reset</Button>
            </Group>
          </div>
          <pre style={{padding: '.25rem', height: '27vh', fontSize: '.6rem', overflow: 'auto', paddingBottom: '1rem', whiteSpace: 'pre-wrap'}}>{editorErrors}</pre>
      </div>
    </MediaQuery>


    <MediaQuery largerThan="md" styles={{ display: 'none !important', }}>

      <div style={{width: '100%', height: 'calc(90vh - 70px)',  }}>
        {showEditor
        ? <Editor
        height="calc(70vh - 70px )"
        defaultLanguage="sol"
        value={editorContent}
        onChange={setEditorContent}
        theme={'vs-dark'}
        /> 
        : <pre style={{fontSize: '.8rem', maxHeight: "calc(70vh - 70px)", height:"calc(80vh - 70px)", margin: '0', overflow: 'auto' }}>{compiledOutput}</pre>
      }
          <div style={{height: '3vh', display: 'flex', justifyContent: 'space-between' }}>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='lime' onClick={handleCompile}>Compile (mobile)</Button>
              <Button size='xs' variant='filled' color='gray'  onClick={()=>setShowEditor(s =>!s)}>{showEditor ? 'Show Compiled' : 'Show Editor'}</Button>
            </Group>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='red'  onClick={()=> setEditorContent(props.code)}>Reset</Button>
            </Group>
          </div>
          <pre style={{padding: '.25rem', height: '17vh', fontSize: '.6rem', overflow: 'scroll', paddingBottom: '1rem', whiteSpace: 'pre-wrap'}}>{editorErrors}</pre>
      </div>
    </MediaQuery>
    </>

  )
}
export default CustomEditor