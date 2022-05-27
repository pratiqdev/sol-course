import { useState, useEffect } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useUserContext } from '@utils/context';
import { Text, Input, NativeSelect } from '@mantine/core';

const QuestionString = (props:any) => {
  const {index, data} = props
  
  return(
    <>
      <Text>{index + 1} - {data.question}</Text>
      <Input style={{marginBottom: '1rem'}}/>
    </>
  )
}

const QuestionOptions = (props:any) => {
  const {index, data} = props
  
  return(
    <>
      <Text>{index + 1} - {data.question}</Text>
      <NativeSelect
        data={['select one', ...data.options]}
        placeholder="Pick one"
        // label="Select your favorite framework/library"
        // description="This is anonymous"
        // required
      />
    </>
  )
}

const Questionnaire = (props:any) => {

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

  const qas = props.qas || []


  return (
    <div style={{marginTop: '70px', width: width ,height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '1rem', paddingTop: '.5rem'  }}>
      {qas.map((x:any, i:number) => {
        switch(x.type){
          case 'options': return <QuestionOptions data={x} index={i} />; break;
          default: return <QuestionString data={x} index={i} />
        }
      })} 
    </div>

  )
}
export default Questionnaire