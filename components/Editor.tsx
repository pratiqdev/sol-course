import { useState, useEffect } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import useConnectionManager from '@utils/hooks/useConnectionManager';
import {
  Button,
  NativeSelect,
  Group,
  MediaQuery
} from '@mantine/core'
import axios from 'axios';
import { ICodeTest } from '@utils/interfaces';
import { language } from 'gray-matter';


/**
 * Grab the editor code from the progress object if it exists
 */

interface ICustomEditorProps{
  categoryUri: string;
  courseUri: string;
  code: string;
  tests: ICodeTest[]
}

interface IErrorObject {
  type: 'test' | 'compiler' | 'success' | 'data';
  title: string;
  message: string;
}

interface IErrorCardProps {
  data: any;
}

const ErrorCard = (props: any) => {
  const {type, title, message} = props.data
  let bg = 'green'
  if(type === 'test'){
    bg ='#fd56'
  }else if(type === 'compiler'){
    bg = '#f876'
  }else if(type === 'success'){
    bg = '#8f86'
  }else{
    bg = '#2226'
  }

  return(
    <div style={{background: bg , padding: '.5rem', paddingBottom: '0', border: '1px solid white', marginTop: '.5rem', borderRadius: '.25rem', color: 'white', fontSize: '.6rem'}}>
      <b>{title}</b>
      <pre>{message}</pre>
    </div>
  )

}

const CustomEditor = (props:ICustomEditorProps) => {

  // let [categoryUri, courseUri] = props.URI.split('/')

  const { categoryUri, courseUri, code, tests} = props



  const [editorContent, setEditorContent] = useState<string>('loading...')
  const [editorErrors, setEditorErrors] = useState('You must compile your code first...')
  const [compiledOutput, setCompiledOutput] = useState('You must compile your code first...')
  const [compiling, setCompiling] = useState(false)
  const [showEditor, setShowEditor] = useState(true)
  const [width, setWidth] = useState('calc(100vw - 120px)')
  const [testPassed, setTestPassed] = useState(false)
  const { ctx, useUriStore } = useConnectionManager()
  const [store, setStore] = useUriStore(props.categoryUri, props.courseUri)
  const [catStore, setCatStore] = useUriStore(props.categoryUri)
  const [errorItemArray, setErrorItemArray] = useState<IErrorObject[]>([])

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








  const handleCodeUpdate = (code: string) => {
    setEditorContent(code)
    setStore((p) => ({...p, code}))
  }





  /**
   * test a string for regex match
   * returns true if regex found
   * returns false if regex not found (or found in comment)
   */
  const doesRegexExist = (str: string, reg: string) => {
    let RESULT = false
    if(str.search(reg)){
      // console.log('CODE | found regex. Checking for comment...')
      // regex found -> make sure its not a comment

      const lines = str.split('\n')
      lines.forEach((line:any, lineIndex:number) => {
        let regIndex = line.search(reg)
        let comIndex = line.search('//')

        if(regIndex >= 0 && comIndex === -1){
          // console.log('CODE | found reg with no comment')
          RESULT = true
        }

        if(comIndex >= 0 && regIndex >=0 && comIndex > regIndex){
          // console.log('CODE | found reg before comment')
          RESULT = true;
        }

      })

    }

    return RESULT
  }





  const handleCompile = async () => {
    setCompiling(true)
    setEditorErrors('Compiling code...')

    let errorArr: IErrorObject[] = []
    let feedback: any = catStore.feedback || {}

    

    const response = await axios.post('/api/solc-compile', {code: editorContent})

    if(response.data.success){
      let output = JSON.parse(response.data.output)

      if(output.errors && output.errors.length){
        output.errors.forEach((x:any, i:number) => {
          errorArr.push({
            type: 'compiler',
            title: `COMPILER ERROR: (${x.errorCode})`,
            message: x.formattedMessage.replace('--> code.sol:', '').trim()
          })
        })
      }else{
        setCompiledOutput('Errors during compilation. Fix errors and compile again to see output.')
      }

      
      props.tests.forEach((test:any, i: number)=>{
        const reg = new RegExp(test.regex, 'gi');
        let exists = doesRegexExist(editorContent, test.regex)

        if(
          (test.exist && !exists)
          || (!test.exist && exists)
        ){
          errorArr.push({
            type: 'test',
            title: `TEST ERROR: (${test.type})`,
            message: `${test.title}\n${test.message}`
          })
          feedback[test.feedback.title] = test.feedback

        }
        
      })
      // let errorHeading = `Compiled with version: ${response.data.version} in ${response.data.duration}s\n${numErrors ? `${numErrors} ${numErrors > 1 ? 'errors' : 'error'}:\n\n` : 'No errors\n\n'}`

      // setEditorErrors(errorHeading + errorContent)
      
      setTestPassed(errorArr.length === 0)

      console.log('CODE | compile/test success - save to progress')


      setStore((s:any) => ({...s, complete: errorArr.length === 0}))
      setCatStore((s:any)=>({...s, feedback}))
  





    }else{
      console.log(response)
    }
    setCompiling(false)

    if(errorArr.length === 0){
      errorArr.push({
        type: 'success',
        title: `Compile success!`,
        message: `Compiled with no errors and all tests passed!`
      })
    }else{
      errorArr.unshift({
        type: 'data',
        title: `Errors found: ${errorArr.length}`,
        message: `Compiled with errors or tests failed`
      })
    }
    setErrorItemArray(errorArr)
  }








  useEffect(()=>{ 
    setEditorContent(store.code || props.code)
  },[ctx.address, ctx.connected, ctx.isVerified, store])
 

  return (
    <>
      <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>

      <div style={{marginTop: '70px', width: width, minWidth: width, maxWidth: width, height: 'calc(100vh - 70px)', maxHeight:  'calc(100vh - 70px)' }}>
        {showEditor
        ? <Editor
        height="calc(70vh - 70px )"
        defaultLanguage="sol"
        value={editorContent}
        onChange={(c) => handleCodeUpdate(c || '')}
        theme={'vs-dark'}
        /> 
        : <pre style={{fontSize: '.8rem', maxHeight: "calc(70vh - 70px)", height:"calc(80vh - 70px)", margin: '0', overflow: 'auto' }}>{compiledOutput}</pre>
      }
          <div style={{height: '3vh', display: 'flex', justifyContent: 'space-between' }}>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='lime' onClick={handleCompile} loading={compiling}>Compile</Button>
              {/* <Button size='xs' variant='filled' color='lime' onClick={()=>console.log(ctx.progress)}>Log Prog</Button> */}
              {/* <Button size='xs' variant='filled' color='lime' onClick={checkStorage}>Check Store</Button> */}
              <Button size='xs' variant='filled' color='gray'  onClick={()=>setShowEditor(s =>!s)}>{showEditor ? 'Show Output' : 'Show Editor'}</Button>
            </Group>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='red'  onClick={()=> handleCodeUpdate(props.code)}>Reset</Button>
            </Group>
          </div>
          <div style={{padding: '.5rem', height: '27vh', overflow: 'auto', paddingBottom: '1rem'}}>
            {errorItemArray.map(item => <ErrorCard key={item.message} data={item} />)}
          </div>
      </div>
    </MediaQuery>


    <MediaQuery largerThan="md" styles={{ display: 'none !important', }}>

      <div style={{width: '100%', height: 'calc(90vh - 70px)'}}>
        {showEditor
        ? <Editor
        height="calc(70vh - 70px )"
        defaultLanguage="sol"
        value={editorContent}
        onChange={(c) => handleCodeUpdate(c || '')}
        theme={'vs-dark'}
        /> 
        : <pre style={{fontSize: '.8rem', maxHeight: "calc(70vh - 70px)", height:"calc(80vh - 70px)", margin: '0', overflow: 'auto' }}>{compiledOutput}</pre>
      }
          <div style={{height: '3vh', display: 'flex', justifyContent: 'space-between' }}>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='lime' onClick={handleCompile} loading={compiling}>Compile</Button>
              <Button size='xs' variant='filled' color='gray'  onClick={()=>setShowEditor(s =>!s)}>{showEditor ? 'Show Output' : 'Show Editor'}</Button>
            </Group>
            <Group spacing="xs" style={{padding: '.5rem'}}>
              <Button size='xs' variant='filled' color='red'  onClick={()=> setEditorContent(props.code)}>Reset</Button>
            </Group>
          </div>
          <div style={{padding: '.5rem', height: '27vh', overflow: 'auto', paddingBottom: '1rem'}}>
            {errorItemArray.map(item => <ErrorCard key={item.message} data={item} />)}
          </div>
      </div>
    </MediaQuery>
    </>

  )
}
export default CustomEditor