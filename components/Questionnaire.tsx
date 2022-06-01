import { useState, useEffect, useRef } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useUserContext } from '@utils/context';
import { Text, Input, NativeSelect, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Modal from '@components/Modal'
import next from 'next';
interface Question {
  /** The type of input to render */
  type?: 'string' | 'options';
  /** The question that appears in the questionnaire */
  question: string;
  /** The correct answer. Matched lowercase and whitespace trimmed */
  answer: string;
  /** Array of options for dropdown menu */
  options?: string[];
  /** User feedback for this question */
  feedback: {
    /** Shows feedback under the question if answered incorrectly */
    response: string;
    /** Shows before the course final test for study suggestions */
    suggestion?: string;
    /** Related links that can provide more info for the user */
    links?: {[key: string]: string;}
  }
}
interface QuestionnaireProps {
  qas: Question[]
}


const Questionnaire = (props:QuestionnaireProps) => {

  const [width, setWidth] = useState('calc(100vw - 120px)')
  const { ctx, setCtx } = useUserContext()
  const isMobile = useMediaQuery('(max-width: 992px)');

  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [responseModalOpen, setResponseModalOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [responseIndex, setResponseIndex] = useState(0)
  const [responses, setResponses] = useState<any>([])








  //+ QUESTION TYPES ///////////////////////////////////////////////////////////



  const QuestionString = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)
    
    const handleLocalChange = (e:any) => {
      console.log('QUESTIONNAIRE | QuestionString | handleLocalChange...')
      
      setValue(e.target.value)
      props.handleChange(index, e.target.value)
      setCorrect(responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim())
      console.log('QUESTIONNAIRE | QuestionString | correct:', e.target.value, responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim())
    }
    
    return(
      <div style={{marginBottom: '1rem'}}>
        <Text>{index + 1} - {data.question}</Text>
        <Input defaultValue={value} onChange={handleLocalChange}/>
        {wasSubmitted && !correct &&
          <small style={{color: 'red'}}>{data.feedback.response}</small>
        }
      </div>
    )
  }








  
  const QuestionOptions = (props:any) => {
    const {index, data} = props
    
    return(
      <>
        <Text>{index + 1} - {data.question}</Text>
        <NativeSelect
          onChange={(e:any) => props.handleChange(index, e.target.value)}
          data={['select one', ...data.options]}
          placeholder="Pick one"
        />
      </>
    )
  }
  











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












  useEffect(()=>{
    let tempResponses:any[] = []
    props.qas.forEach((q:any, i:number) => {

      tempResponses.push({
        ...q,
        givenAnswer: '',
        isCorrect: false,
      })
      setResponses(tempResponses)
    })
    setMaxScore(tempResponses.length)
  
  }, [props.qas])












  const handleSubmit = () => {
    console.log('QUESTIONNAIRE | handleSubmit...')

    setWasSubmitted(true)
    setResponseModalOpen(true)
    console.log('QUESTIONNAIRE | submit Responses:',responses)
    let score = 0
    // props.qas.forEach((q:any, i:number) => {
    //   if(responses[i]){
    //     console.log(`QUESTIONNAIRE | found index ${i} in ${responses}`)
    //     if(responses[i].givenAnswer === q.answer){
    //       score += 1
    //     }
    //   }else{
    //     console.log(`QUESTIONNAIRE | could not find index ${i} in ${responses}`)
    //   }
    // })
    // console.log('QUESTIONNAIRE | score:', score)


  }











  const nextFeedback = () => {
    if(responseIndex < responses.length - 1){
      setResponseIndex(i => i + 1)
    }
  }

  const prevFeedback = () => {
    if(responseIndex > 0){
      setResponseIndex(i => i - 1)
    }
  }

  const handleCloseModal = () => {
    setResponseIndex(0)
    setResponseModalOpen(false)
  }

  










  const handleChange = (index:number, answer:string) => {
    console.log('QUESTIONNAIRE | handleChange...')

    // console.log(index, answer)
    let tempResponses = responses
    tempResponses[index].givenAnswer = answer
    console.log('QUESTIONNAIRE | set responses:',tempResponses)
    setResponses(tempResponses)
  }


  return (
    <div style={{marginTop: '70px', width: isMobile ? '100%' : width , height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '1rem', paddingTop: '.5rem'  }}>
      {responses.map((x:any, i:number) => {
        switch(x.type){
          case 'options': return <QuestionOptions data={x} index={i} handleChange={handleChange} />; break;
          default: return <QuestionString data={x} index={i} handleChange={handleChange} />
        }
      })}
      <Button style={{marginTop: '2rem'}} onClick={handleSubmit}>Submit</Button>
      {wasSubmitted && <p>SCORE: {score} / {maxScore}</p>}

      {/* {responses.length && 
        <Modal size='lg' centered open={responseModalOpen} title='Feedback' >

          <p><b>Question:</b> {responses[responseIndex].question}</p>
          <p><b>Correct Answer:</b> {responses[responseIndex].answer}</p>
          <p><b>Your Answer:</b> {responses[responseIndex].givenAnswer}</p>
          <pre>{JSON.stringify(responses[responseIndex], null, 2)}</pre>


          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button onClick={prevFeedback} disabled={responseIndex === 0}>Back</Button>
            {responseIndex < responses.length - 1
              ? <Button onClick={nextFeedback}>Next</Button>
              : <Button onClick={handleCloseModal}>Close</Button>
            }
          </div>
        </Modal>
      } */}
    </div>

  )
}
export default Questionnaire