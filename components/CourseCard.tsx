import {
    Paper,
    Text,
    Button
} from '@mantine/core'
import Link from 'next/link'

const CourseCard = (props: any) => {
    const { data } = props
    return(
        <Paper shadow="sm" p="md" sx={{background: '#335', height: '100%', display: 'flex', flexDirection: 'column', borderLeft: data.restricted ? '4px solid red' : ''}}>
            <div style={{flexGrow: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <Text size='lg' style={{color: 'white', fontWeight: 'bold'}}>{data.title}</Text>
                    <Link href={'/courses/' + data.courses[0].file} passHref><Button component='a' size='xs'>Start</Button></Link>
                </div>
                <Text>{data.description}</Text>
                </div>
            <Text size='xs' style={{marginTop: '.5rem'}}>Difficulty: {data.difficulty} / 100</Text>
        </Paper>
    )
}
export default CourseCard
