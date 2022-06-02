import {
    Paper,
    Text,
    Button
} from '@mantine/core'
import Link from 'next/link'

const CourseCard = (props: any) => {
    const { data } = props
    //@ts-ignore
    const entryFile = Object.entries(data.courses)[0][1].file
    console.log('entry point file:', entryFile)
    return(
        <Paper shadow="sm" p="md" sx={{background: '#335', height: '100%', display: 'flex', flexDirection: 'column', borderLeft: data.restricted ? '4px solid red' : ''}}>
            <div style={{flexGrow: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <Text size='lg' style={{color: 'white', fontWeight: 'bold'}}>{data.title}</Text>
                    <Link href={'/courses/' + entryFile} passHref><Button component='a' size='xs'>Start</Button></Link>
                </div>
                <Text>{data.description}</Text>
                </div>
            <Text size='xs' style={{marginTop: '.5rem'}}>Difficulty: {data.difficulty} / 100</Text>
        </Paper>
    )
}
export default CourseCard
