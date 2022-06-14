import {
    Paper,
    Text,
    Button
} from '@mantine/core'
import Link from 'next/link'
import useConnectionManager from '@utils/hooks/useConnectionManager'
import { useEffect, useState } from 'react'

const CourseCard = (props: any) => {
    const { data } = props
    const {ctx, checkCompletion, useUriStore} = useConnectionManager()
    const category = data.title.toLowerCase().replace(' ','-')
    const [store, setStore] = useUriStore(category)

    const [completePercentage, setCompletePercentage] = useState('N/A')
    //@ts-ignore
    const entryFile = Object.entries(data.courses)[0][1].file
    // console.log('entry point file:', entryFile)


    const calcCompletion = () => {
        if(!ctx.address || !store) return;


        const totalCoursesInCategory = Object.entries(data.courses).length

        let numCoursesCompleteInCategory = 0

         Object.values(store).forEach((x:any) => {
            if(x.complete){
                numCoursesCompleteInCategory++
            }
         })


        // console.log('calcCompletion | category:', category)
        // console.log('calcCompletion | numCourses:', totalCoursesInCategory)
        

        setCompletePercentage(`${Math.round((numCoursesCompleteInCategory / totalCoursesInCategory) * 100)}%`)


    }

    useEffect(()=>{
        calcCompletion()
    },[ctx.connected, store])


    return(
        <Paper shadow="sm" p="md" sx={{background: '#223', height: '100%', display: 'flex', flexDirection: 'column', borderLeft: data.restricted ? '4px solid red' : ''}}>
            <div style={{flexGrow: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <Text size='lg' style={{color: 'white', fontWeight: 'bold'}}>{data.title}</Text>
                    {completePercentage !== 'N/A' && <Text size='lg' style={{color: completePercentage === '100%' ? 'green' : 'white'}}>{completePercentage}</Text>}
                </div>
                    <Text size='xs' style={{margin: '1rem 0'}}>Difficulty: {data.difficulty} / 100</Text>
                    <Text style={{marginBottom: '1rem'}}>{data.description}</Text>
                </div>
                <Link href={'/courses/' + entryFile} passHref><Button component='a' size='xs' variant='gradient'>Start</Button></Link>
        </Paper>
    )
}
export default CourseCard
