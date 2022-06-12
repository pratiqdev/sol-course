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
  // const { ctx, setCtx } = useGlobalContext()
  const { ctx, setCtx, progress, updateProgress } = useConnectionManager()
  const isMobile = useMediaQuery('(max-width: 992px)');

  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [responseIndex, setResponseIndex] = useState(0)
  const [responses, setResponses] = useState<any>([])
  const [stableResponses, setStableResponses] = useState<any>([])








  //+ QUESTION TYPES ///////////////////////////////////////////////////////////



  const QuestionString = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)
    
    const handleLocalChange = (e:any) => {
      console.log('QAS | QuestionString | handleLocalChange...')
      
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
      if(ctx.progress && ctx.progress[categoryUri] && ctx.progress[categoryUri][courseUri]?.wasSubmitted){
        setWasSubmitted(true)
      }
    },[])

    useEffect(()=>{
      if(wasSubmitted){
        setCorrect(responses[index].answer.toLowerCase().trim() === value.toLowerCase().trim())
      }
    }, [wasSubmitted])

    let outlineColor = '2px solid transparent'
    if(wasSubmitted && !correct){
      outlineColor = '2px solid red'
    }
    if(wasSubmitted && correct){
      outlineColor = '2px solid green'
    }
    
    return(
      <div style={{marginBottom: '1rem'}}>
        <Text>{index + 1} - {data.question}</Text>
        <Input style={{outline: outlineColor, borderRadius: '.25rem'}} defaultValue={value} onChange={handleLocalChange}/>
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
      console.log('QAS | QuestionString | handleLocalChange...')
      
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
      if(ctx.progress && ctx.progress[categoryUri] && ctx.progress[categoryUri][courseUri]?.wasSubmitted){
        setWasSubmitted(true)
      }
    },[])

    useEffect(()=>{
      if(wasSubmitted){
        setCorrect(responses[index].answer.toLowerCase().trim() === value.toLowerCase().trim())
      }
    }, [wasSubmitted])

    let outlineColor = '2px solid transparent'
    if(wasSubmitted && !correct){
      outlineColor = '2px solid red'
    }
    if(wasSubmitted && correct){
      outlineColor = '2px solid green'
    }

    
    return(
      <>
        <Text>{index + 1} - {data.question}</Text>
        <NativeSelect
          onChange={handleLocalChange}
          data={['select one', ...data.options]}
          placeholder="Pick one"
          defaultValue={value}
          style={{outline: outlineColor, borderRadius: '.25rem'}}
        />
        {wasSubmitted && !correct &&
          <small style={{color: 'red'}}>{data.feedback.response}</small>
        }
      </>
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
    console.log('QAS | LOADING STORE')
    if(!ctx.connected || !ctx.address || !ctx.progress){
      console.log('QAS | STORE | cant load store without connecting / address / progress...')

      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {

        tempResponses.push({
          ...q,
          givenAnswer: '',
          // isCorrect: false,
        })
        setResponses(tempResponses)
      })
      setMaxScore(tempResponses.length)

      return;
    }


    console.log('QAS | store loaded...')
    if(
      ctx.progress 
      && categoryUri in ctx.progress 
      && courseUri in ctx.progress[categoryUri] 
      && 'qas' in progress[categoryUri][courseUri]){
      console.log('QAS | STORE | loading code from store:', progress[categoryUri][courseUri].qas)
      // setEditorContent(ctx.progress[uri].code)
      let loadedScore = 0
      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {

        if(q.answer.toLowerCase().trim() === progress[categoryUri][courseUri].qas[i].givenAnswer.toLowerCase().trim()){
          loadedScore++
        }


        tempResponses.push({
          ...q,
          givenAnswer: progress[categoryUri][courseUri]?.qas[i].givenAnswer || '',
          // isCorrect: false,
        })
        setResponses(tempResponses)
      })
      setMaxScore(tempResponses.length)
      setScore(loadedScore)
      // setDoneLoading(true)
    }else{
      console.log('QAS | STORE | no qas in store??', ctx)

      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {
        tempResponses.push({
          ...q,
          givenAnswer: progress[categoryUri][courseUri].qas[i].givenAnswer || '',
          // isCorrect: false,
        })
        setResponses(tempResponses)
      })

      let newProg = {...ctx.progress}

      // if(ctx.address && ctx.progress){
      //   if(categoryUri in newProg && courseUri in newProg[categoryUri]){
      //       newProg[categoryUri] = {}
      //       newProg[categoryUri][courseUri]['qas'] = []
      //     }else{
      //       newProg[uri] = {}
      //     }
      // }else{
      //   newProg[uri] = {}
      // }

      updateProgress((p) => ({...p, ...newProg}))

    }
  }






  useEffect(()=>{
    //~ create a function in the connection manager that will create
    //~ a category / course object if they do not exist 

    handleLoadQasFromStore()
  }, [ctx.address])



















  //+ submit and validate the answers 
  //+///////////////////////////////////////////////////////////////////////////
  const handleSubmit = () => {
    console.log('QAS | handleSubmit...')

    setWasSubmitted(true)
    console.log('QAS | submit Responses:',responses)




    let localScore = 0
    props.qas.forEach((q:any, i:number) => {
      if(responses[i]){
        console.log(`QAS | found index ${i} in ${responses}`)
        if(responses[i].givenAnswer === q.answer){
          localScore += 1
        }
      }else{
        console.log(`QAS | could not find index ${i} in ${responses}`)
      }
    })
    console.log('QAS | score:', localScore)
    setScore(localScore)

    // update the progress object with user responses
    let newProg = {...ctx.progress}

    // if(newProg && newProg && uri in newProg){
    //   // newProg[uri].wasSubmitted = true
    //   // newProg[]
    //   // newProg[uri]['qas'] = responses
    //   newProg[uri] = {
    //     complete: localScore === props.qas.length,
    //     wasSubmitted: true,
    //     qas: responses,
    //   }
    // }

    updateProgress((p) => ({...p, ...newProg}))


  }











  





  //+ Update the store on input / on change
  //+///////////////////////////////////////////////////////////////////////////
  const handleChange = (index:number, answer:string) => {
    console.log('QAS | handleChange...')

    // console.log(index, answer)
    let tempResponses = responses
    tempResponses[index].givenAnswer = answer
    console.log('QAS | set responses:',tempResponses)
    setResponses(tempResponses)
    let newProg = {...ctx.progress}

    // if(ctx.address && ctx.progress){
    //   if(uri in newProg){
    //       newProg[uri]['qas'] = tempResponses
    //     }else{
    //       newProg[uri] = {}
    //     }
    // }else{
    //   newProg[uri] = {}
    // }

    // updateProgress((p) => ({...p, ...newProg}))
  }





  return (
    <div style={{marginTop: '70px', width: isMobile ? '100%' : width , height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '1rem', paddingTop: '.5rem', overflow: 'auto'  }}>
      {responses.map((x:any, i:number) => {
        console.log('QAS | remapping responses')
        switch(x.type){
          case 'options': return <QuestionOptions data={x} index={i} key={x.question} handleChange={handleChange} />; break;
          default: return <QuestionString data={x} index={i} key={x.question} handleChange={handleChange} />
        }
      })}
      <Button size='md' style={{marginTop: '2rem', minHeight: '2rem'}} onClick={handleSubmit}>Submit</Button>
      {wasSubmitted && <p>SCORE: {score} / {maxScore}</p>}

      {/* <pre>{JSON.stringify(progress[uri], null, 2)}</pre> */}
    </div>

  )
}
export default Questionnaire