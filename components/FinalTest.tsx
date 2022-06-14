import { useState, useEffect, useRef } from 'react'
import { Text, Input, NativeSelect, Button, Box, Grid, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { IFinalQuestions, SuggestionCoreTypes } from '@utils/interfaces'
import courseList from '@data/courseList'

import { QuestionMark } from 'tabler-icons-react'


interface IQuestionnaireProps {
  qas: IFinalQuestions[],
  categoryUri: string;
  courseUri: string;
  title: string;
  subtitle: string;
}














const FinalTest = (props:IQuestionnaireProps) => {

  const {categoryUri, courseUri} = props

  const [width, setWidth] = useState('calc(100vw - 120px)')
  const { ctx, useUriStore} = useConnectionManager()
  const [store, setStore] = useUriStore(props.categoryUri, props.courseUri)
  const [catStore, setCatStore] = useUriStore(props.categoryUri)
  const isMobile = useMediaQuery('(max-width: 992px)');

  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [responses, setResponses] = useState<any>([])
  const [categoryComplete, setCategoryComplete] = useState(false)
  
  const [suggestionsCodeType, setSuggestionsCodeType] = useState<any[]>([])
  const [suggestionsConceptType, setSuggestionsConceptType] = useState<any[]>([])
  const [suggestionsTechType, setSuggestionsTechType] = useState<any[]>([])
  const [suggestionsGeneralType, setSuggestionsGeneralType] = useState<any[]>([])

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [hasSuggestions, setHasSuggestions] = useState(false)




  const SuggestionCard = (props:any) => {
    const {title, message, links} = props.item
  
    return (
      <Grid.Col span={4}>
        <Box sx={{border: '1px solid white', borderRadius: '.25rem', padding: '.5rem', height: '100%', '*':{margin: '0px'}}}>
          <h4>{title}</h4>
          <p>{message}</p>
        </Box>
      </Grid.Col>
    )
  }
  
  
  
  const SuggestionBox = () => {
    
    return(
      <>
      {suggestionsConceptType.length > 0 && <>
      <h3>Concept Related Suggestions</h3>
      <Grid>
        {suggestionsConceptType.map((item:any) => <SuggestionCard key={item.message} item={item} />)}
      </Grid>
      </>}
  
      {suggestionsCodeType.length > 0 && <>
      <h3>Code Related Suggestions</h3>
      <Grid>
        {suggestionsCodeType.map((item:any) => <SuggestionCard key={item.message} item={item} />)}
      </Grid>
      </>}
  
      {suggestionsTechType.length > 0 && <>
      <h3>Tech Related Suggestions</h3>
      <Grid>
        {suggestionsTechType.map((item:any) => <SuggestionCard key={item.message} item={item} />)}
      </Grid>
      </>}
  
      {suggestionsGeneralType.length > 0 && <>
      <h3>General Suggestions</h3>
      <Grid>
        {suggestionsGeneralType.map((item:any) => <SuggestionCard key={item.message} item={item} />)}
      </Grid>
      </>}
  
      <pre>{JSON.stringify(catStore.feedback, null, 2)}</pre>
      </>
    )
  }
  





  //+ QUESTION TYPES ///////////////////////////////////////////////////////////



  const QuestionString = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)
    
    const handleLocalChange = (e:any) => {
      console.log('FinalTest | QuestionString | handleLocalChange...')
      
      setValue(e.target.value)
      props.handleChange(index, e.target.value)
      setCorrect(responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim())
      console.log(
        'FinalTest | QuestionString | correct:', 
        e.target.value, 
        responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim()
      )
    }

    // set "wasSubmitted" from progress[uri]
    useEffect(()=>{
      if(store.wasSubmitted){
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
          <small style={{color: 'red'}}>{data.feedback}</small>
        }
      </div>
    )
  }








  
  const QuestionOptions = (props:any) => {
    const {index, data} = props
    const [value, setValue] = useState(data.givenAnswer)
    const [correct, setCorrect] = useState(false)


    const handleLocalChange = (e:any) => {
      console.log('FinalTest | QuestionString | handleLocalChange...')
      
      setValue(e.target.value)
      props.handleChange(index, e.target.value)
      setCorrect(responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim())
      console.log(
        'FinalTest | QuestionString | correct:', 
        e.target.value, 
        responses[index].answer.toLowerCase().trim() === e.target.value.toLowerCase().trim()
      )
    }

    useEffect(()=>{
      if(store?.wasSubmitted){
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
          <small style={{color: 'red'}}>{data.feedback}</small>
        }
      </>
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
  













  //+ Load qas from store //////////////////////////////////////////////////////
  //+ This will allow users to traverse the site in search of the correct answer
  const handleLoadQasFromStore = async () => {

    console.log('FinalTest | LOADING STORE')
    if(!ctx.connected || !ctx.address || !store){
      console.log('FinalTest | STORE | cant load store without connecting / address / progress...')

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


    console.log('FinalTest | store loaded...')
    if('qas' in store){
      console.log('FinalTest | STORE | loading code from store:', store)
      // setEditorContent(ctx.progress[uri].code)
      let loadedScore = 0
      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {

        if(q.answer.toLowerCase().trim() === store.qas[i].givenAnswer.toLowerCase().trim()){
          loadedScore++
        }


        tempResponses.push({
          ...q,
          givenAnswer: store?.qas[i]?.givenAnswer || '',
          // isCorrect: false,
        })
        setResponses(tempResponses)
      })
      setMaxScore(tempResponses.length)
      setScore(loadedScore)
      // setDoneLoading(true)
    }else{
      console.log('FinalTest | STORE | no qas in store??', ctx)

      let tempResponses:any[] = []
      props.qas.forEach((q:any, i:number) => {
        tempResponses.push({
          ...q,
          givenAnswer: '',
            // isCorrect: false,
        })
        setResponses(tempResponses)
      })



      setStore((s:any)=> ({...s, qas: tempResponses}))

    }
  }





  const checkAllComplete = () => {
    console.log('CAC | Checking all courses are complete before test...')
    let totalCourses = Object.entries(courseList[categoryUri].courses).length - 1 // dont include the test iin this calc
    
    let completeCourses = 0
    Object.entries(catStore).forEach((item:any) => {
      if(item[1].complete){ 
        console.log('CAC | found complete course:', item[0])
        completeCourses ++
      }
    })
    console.log('CAC | courses:', {totalCourses, completeCourses})

    setCategoryComplete(totalCourses === completeCourses)

  }




 

  useEffect(()=>{
    if(ctx.address && Object.entries(catStore).length){
      handleLoadQasFromStore()
      checkAllComplete()
    } 
  }, [ctx.address, catStore])



















  //+ submit and validate the answers 
  //+///////////////////////////////////////////////////////////////////////////
  const handleSubmit = () => {
    console.log('FinalTest | handleSubmit...')

    setWasSubmitted(true)
    console.log('FinalTest | submit Responses:',responses)




    let localScore = 0
    props.qas.forEach((q:any, i:number) => {
      if(responses[i]){
        console.log(`FinalTest | found index ${i} in ${responses}`)
        if(responses[i].givenAnswer === q.answer){
          localScore += 1
        }
      }else{
        console.log(`FinalTest | could not find index ${i} in ${responses}`)
      }
    })
    console.log('FinalTest | score:', localScore)
    setScore(localScore)

    // update the progress object with user responses
    let newProg = {...ctx.progress}

    if(newProg && categoryUri in newProg){
      // newProg[uri].wasSubmitted = true
      // newProg[]
      // newProg[uri]['qas'] = responses
      newProg[categoryUri][courseUri] = {
        complete: localScore === props.qas.length,
        wasSubmitted: true,
        qas: responses,
      }
    }

    // updateProgress((p) => ({...p, ...newProg}))


  }











  





  //+ Update the store on input / on change
  //+///////////////////////////////////////////////////////////////////////////
  const handleChange = (index:number, answer:string) => {
    console.log('FinalTest | handleChange...')

    // console.log(index, answer)
    let tempResponses = responses
    tempResponses[index].givenAnswer = answer
    console.log('FinalTest | set responses:',tempResponses)
    setResponses(tempResponses)

  }







  // const [suggestionsCodeType, setSuggestionsCodeType] = useState([])
  // const [suggestionsConceptType, setSuggestionsConceptType] = useState([])
  // const [suggestionsTechType, setSuggestionsTechType] = useState([])
  // const [suggestionsGeneralType, setSuggestionsGeneralType] = useState([])
  // title / message / links

  const parseSuggestions = () => {
    const codeType:any[] = []
    const conceptType:any[] = []
    const techType:any[] = []
    const generalType:any[] = []

    Object.entries(catStore.feedback).forEach((item:any) => {
      let data = item[1]

      switch(data.coreType){

        case SuggestionCoreTypes.CODE: codeType.push({
          title: data.title,
          message: data.suggestion,
          links: data.links
        }); break;

        case SuggestionCoreTypes.CONCEPT: conceptType.push({
          title: data.title,
          message: data.suggestion,
          links: data.links
        }); break;

        case SuggestionCoreTypes.CONCEPT: techType.push({
          title: data.title,
          message: data.suggestion,
          links: data.links
        }); break;

        default: generalType.push({
          title: data.title,
          message: data.suggestion,
          links: data.links
        })

      }

    })

    if(
      codeType.length > 0
      || conceptType.length > 0
      || techType.length > 0
      || generalType.length > 0
    ){
      setShowSuggestions(true)
      setHasSuggestions(true)
    }

    setSuggestionsCodeType(codeType)
    setSuggestionsConceptType(conceptType)
    setSuggestionsTechType(techType)
    setSuggestionsGeneralType(generalType)

  }


  useEffect(()=>{
    if(catStore.feedback){
      parseSuggestions()
    }
  },[catStore])






  return (
    <div style={{marginTop: '70px', width: '100%' , height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '1rem', paddingTop: '.5rem', overflow: 'auto', overflowX:'hidden'  }}>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '1rem', paddingRight: '.5rem'}}>
        <Text sx={{color: '#68f', fontSize: '.8rem'}}>{props.categoryUri} / {props.courseUri}</Text>
        {hasSuggestions && <ActionIcon variant={showSuggestions ? 'hover' : 'filled'} color='blue' size='md' onClick={()=>setShowSuggestions(b => !b)}><QuestionMark size={20}/></ActionIcon>}
      </div>

        <h2 style={{margin: '0', marginTop: '1rem'}}>{props.title}</h2>

      {!ctx.connected && <p>Not Connected - You must be connected to take any tests for any category</p>}
      {(ctx.connected && !categoryComplete) &&<p>Not complete - You must complete all courses in this category before taking this test!</p>}

      {(ctx.connected && categoryComplete) && <>

        {showSuggestions 
        ?<SuggestionBox />
        :<>
          {responses.map((x:any, i:number) => {
            console.log('FinalTest | remapping responses')
            switch(x.type){
              case 'options': return <QuestionOptions data={x} index={i} key={x.question} handleChange={handleChange} />; break;
              case 'boolean': return <QuestionBoolean data={x} index={i} key={x.question} handleChange={handleChange} />; break;
              default: return <QuestionString data={x} index={i} key={x.question} handleChange={handleChange} />
            }
          })}

          <Button size='md' style={{marginTop: '2rem', minHeight: '2rem'}} onClick={handleSubmit}>Submit</Button>
          {wasSubmitted && <p>SCORE: {score} / {maxScore}</p>}
        </>}
    
        
      </>}

 




      
      

    </div>

  )
}
export default FinalTest