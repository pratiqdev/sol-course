import useConnectionManager from '@utils/hooks/useConnectionManager'

interface IStatusBadgeProps {
    path:string
}

const StatusBadge = (props: IStatusBadgeProps) => {
    const {checkCompletion} = useConnectionManager()
    // console.log(`SHELL | Checking completion of progress[${file}]`)
    const splitPath = props.path.split('/')
    const category = splitPath[0].toLowerCase()
    const course = splitPath[1].toLowerCase()
    const completeStatus = checkCompletion(category, course)

    console.log('STATUS | checking completion of:', {category, course, complete: completeStatus})
    switch(completeStatus){
        case 1: return <div style={{display: 'inline-block',width: '.7rem', height: '.7rem', background: '#888', borderRadius: '.4rem', marginRight: '3px'}}/>;
        case 2: return <div style={{display: 'inline-block', width: '.7rem', height: '.7rem', background: '#66f', borderRadius: '.4rem', marginRight: '3px'}}/>;
        case 3: return <div style={{display: 'inline-block', width: '.7rem', height: '.7rem', background: '#0f0', borderRadius: '.4rem', marginRight: '3px'}}/>;
        default: return <div style={{display: 'inline-block', width: '.7rem', height: '.7rem', background: 'transparent', borderRadius: '.4rem', marginRight: '3px'}}/>
    }
    

}

export default StatusBadge