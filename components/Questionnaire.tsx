import { useState, useEffect, useRef } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { Text, Input, NativeSelect, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { IQuestionField } from '@utils/interfaces'


interface QuestionnaireProps {
  qas: IQuestionField[],
  categoryUri: string;
  courseUri: string;
}


const Questionnaire = (props:QuestionnaireProps) => {

  const {categoryUri, courseUri} = props

  const [width, setWidth] = useState('calc(100vw - 120px)')
  const { ctx, useUriStore} = useConnectionManager()
  const [store, setStore] = useUriStore(categoryUri, courseUri)
  const [catStore, setCatStore] = useUriStore(categoryUri)
  const isMobile = useMediaQuery('(max-width: 992px)');

  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [responses, setResponses] = useState<any>([])








  //+ QUESTION TYPES ///////////////////////////////////////////////////////////



  const QuestionString = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)
    
    const handleLocalChange = (e:any) => {
      // console.log('QAS | QuestionString | handleLocalChange...')
      
      setValue(e.target.value)
      props.handleChange(index, e.target.value)
      setCorrect(responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim())
      console.log(
        'QAS | QuestionString | correct:', 
        e.target.value, 
        responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim()
      )
    }

    // set "wasSubmitted" from progress[uri]
    useEffect(()=>{
      if(store && store.wasSubmitted){
        setWasSubmitted(true)
      }
    },[])

    useEffect(()=>{
      if(wasSubmitted){
        setCorrect(responses[index].answer.toLowerCase().trim() === value.toLowerCase().trim())
      }
    }, [wasSubmitted])

    let outlineColor = '4px solid transparent'
    if(wasSubmitted && !correct){
      outlineColor = '4px solid red'
    }
    if(wasSubmitted && correct){
      outlineColor = '4px solid green'
    }
    
    return(
      <div style={{borderLeft: outlineColor, padding: '0', paddingLeft: wasSubmitted ? '5px' : '0', marginBottom: '1rem'}}>
        <Text>{index + 1} - {data.question}</Text>
        <Input style={{borderRadius: '.25rem'}} defaultValue={value} onChange={handleLocalChange}/>
        {wasSubmitted && !correct &&
          <small style={{color: 'red'}}>{data.feedback.response}</small>
        }
      </div>
    )
  }








  
  const QuestionOptions = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)


    const handleLocalChange = (e:any) => {
      // console.log('QAS | QuestionString | handleLocalChange...')
      
      setValue(e.target.value)
      props.handleChange(index, e.target.value)
      setCorrect(responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim())
      console.log(
        'QAS | QuestionString | correct:', 
        e.target.value, 
        responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim()
      )
    }

    useEffect(()=>{
      if(store && store.wasSubmitted){
        setWasSubmitted(true)
      }
    },[])

    useEffect(()=>{
      if(wasSubmitted){
        setCorrect(responses[index].answer.toLowerCase().trim() === value.toLowerCase().trim())
      }
    }, [wasSubmitted])

    let outlineColor = '4px solid transparent'
    if(wasSubmitted && !correct){
      outlineColor = '4px solid red'
    }
    if(wasSubmitted && correct){
      outlineColor = '4px solid green'
    }

    
    return(
      <div style={{borderLeft: outlineColor, padding: '0', paddingLeft: wasSubmitted ? '5px' : '0', marginBottom: '1rem'}}>
        <Text>{index + 1} - {data.question}</Text>
        <NativeSelect
          onChange={handleLocalChange}
          data={['select one', ...data.options]}
          placeholder="Pick one"
          defaultValue={value}
          style={{borderRadius: '.25rem'}}
        />
        {wasSubmitted && !correct &&
          <small style={{color: 'red', padding: '0', margin: '0'}}>{data.feedback.response}</small>
        }
      </div>
    )
  }
  







  
  const QuestionBoolean = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)
    const [wasSelected, setWasSelected] = useState(false)


    const handleLocalChange = (val:any) => {
      // console.log('QAS | QuestionString | handleLocalChange...')
      setWasSelected(true)
      setValue(val)
      props.handleChange(index, val)
      setCorrect(responses[index].answer == val.toString())
      console.log(
        'QAS | QuestionString | correct:', 
        val, 
        responses[index].answer == val.toString() ? 'correct' : 'wrong'
      )
    }

    useEffect(()=>{
      if(store && store.wasSubmitted){
        setWasSubmitted(true)
      }
    },[])

    useEffect(()=>{ 
      if(wasSubmitted){
        setCorrect(responses[index].answer == value.toString())
      }
    }, [wasSubmitted])

    let outlineColor = '4px solid transparent'
    if(wasSubmitted && !correct){
      outlineColor = '4px solid red'
    }
    if(wasSubmitted && correct){
      outlineColor = '4px solid green'
    }

    
    return(
      <div style={{borderLeft: outlineColor, padding: '0', paddingLeft: wasSubmitted ? '5px' : '0', marginBottom: '1rem'}}>
        <Text>{index + 1} - {data.question}</Text>
        <div style={{display: 'flex', width: '100%', justifyContent: 'stretch'}}>
          <Button fullWidth variant={wasSelected ? value ? 'white' : 'subtle' : 'default'}  sx={{marginRight: '10px'}} onClick={()=>handleLocalChange(true)}>True</Button>
          <Button fullWidth variant={wasSelected ? !value ? 'white' : 'subtle' : 'default'} onClick={()=>handleLocalChange(false)}>False</Button>
        </div>
        {wasSubmitted && !correct &&
          <small style={{color: 'red'}}>{data.feedback.response}</small>
        }
      </div>
    )
  }
  










  //+ control questionnaire width on mount /////////////////////////////////////
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
  }, [ctx.navOpen, ctx.instructionsOpen])







  //+ Load qas from store //////////////////////////////////////////////////////
  const handleLoadQasFromStore = async () => {
    if(!ctx.address || !store || Object.entries(store).length === 0){
      console.log('QAS | LOAD_STORE | cant load store without connecting / address / progress...')

      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {

        tempResponses.push({
          ...q,
          givenAnswer: '',
          // isCorrect: false,
        })
      })
      console.log("QAS | LOAD_STORE | Setting responses from blank qas")
      setResponses(tempResponses)
      setMaxScore(tempResponses.length)

      return;
    }



    if(store.hasOwnProperty('qas')){

      console.log('QAS | LOAD_STORE | loading code from store:', store)
      // setEditorContent(ctx.progress[uri].code)
      let loadedScore = 0
      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {

        console.log('QAS | LOAD_STORE | CHECKING ANSWER: ', {real: q.answer, given: store.qas[i].givenAnswer, correct: q.answer == store.qas[i].givenAnswer.toString()})

        if(q.answer.toLowerCase().trim() == store.qas[i].givenAnswer.toString().toLowerCase().trim()){
          loadedScore++
        }

 

        tempResponses.push({
          ...q,
          givenAnswer: store.qas[i].givenAnswer,
          // isCorrect: false,
        })
      })
      console.log("QAS | LOAD_STORE |  Setting responses from store")
      setResponses(tempResponses)
      setMaxScore(tempResponses.length)
      setScore(loadedScore)
      // setDoneLoading(true)

    }else{
      console.log('QAS | LOAD_STORE |  no "qas" in store!?', store)

      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {
        tempResponses.push({
          ...q,
          givenAnswer: '',
          // isCorrect: false,
        })
      })
      console.log("QAS | LOAD_STORE | Setting responses from store")

      setResponses(tempResponses)
      store['qas'] = tempResponses
      console.log('QAS | STORE | set "qas" property:', store)
      setStore((s:any) => store)



    }
    console.log('QAS | LOAD_STORE |  tempResponses:', responses)
  }

  useEffect(()=>{
    console.log("QAS | LOAD_STORE |  change:", store)
  },[store])






  useEffect(()=>{
      handleLoadQasFromStore()
  }, [ctx.address, store])



















  //+ submit and validate the answers 
  //+///////////////////////////////////////////////////////////////////////////
  const handleSubmit = () => {
    console.log('QAS | SUBMIT | handleSubmit...')

    setWasSubmitted(true)
    console.log('QAS | SUBMIT | submit Responses:',responses)




    let localScore = 0
    props.qas.forEach((q:any, i:number) => {
      if(responses[i]){
        console.log(`QAS | SUBMIT | ${i}:`, {given: responses[i].givenAnswer, real: q.answer.toString()})
        if(responses[i].givenAnswer.toString() == q.answer){
          localScore += 1
        }else{
          console.log('QAS | SUBMIT | incorrect | accum feedback ini catStore')
          let feedback = catStore.feedback || {}
          feedback[q.feedback.title] = q.feedback

          setCatStore((s:any)=>({...s, feedback}))
        }
      }else{
        console.log(`QAS | SUBMIT | could not find index ${i} in ${responses}`)
      }
    })
    console.log('QAS | SUBMIT | score:', localScore)
    setScore(localScore)


    setStore((s:any)=>({...s, qas: responses, wasSubmitted: true, complete: localScore === maxScore}))

      console.log('QAS | SUBMIT | TEST COMPLETE?', {localScore, maxScore})


  }











  





  //+ Update the store on input / on change
  //+///////////////////////////////////////////////////////////////////////////
  const handleChange = (index:number, answer:string) => {
    // console.log('QAS | handleChange...')

    // console.log(index, answer)
    let tempResponses = responses
    tempResponses[index].givenAnswer = answer
    // console.log('QAS | set responses:',tempResponses)
    setResponses(tempResponses)

  }





  return (
    <div style={{marginTop: '70px', width: isMobile ? '100%' : width , height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '1rem', paddingTop: '.5rem', overflow: 'auto'  }}>
      {console.log('QAS | remapping responses:', responses)}
      {responses.map((x:any, i:number) => {
        switch(x.type){
          case 'options': return <QuestionOptions data={x} index={i} key={x.question} handleChange={handleChange} />; break;
          case 'boolean': return <QuestionBoolean data={x} index={i} key={x.question} handleChange={handleChange} />; break;
          default: return <QuestionString data={x} index={i} key={x.question} handleChange={handleChange} />
        }
      })}
      <Button size='md' style={{marginTop: '2rem', minHeight: '2rem'}} onClick={handleSubmit} >Submit</Button>
      {wasSubmitted && <p>SCORE: {score} / {maxScore}</p>}

      {/* <pre>{JSON.stringify(progress[uri], null, 2)}</pre> */}
    </div>

  )
}
export default Questionnaire