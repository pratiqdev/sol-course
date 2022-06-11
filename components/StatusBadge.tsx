import useConnectionManager from '@utils/hooks/useConnectionManager'

const StatusBadge = ({file}) => {
    const {checkCompletion} = useConnectionManager()
    // console.log(`SHELL | Checking completion of progress[${file}]`)
    switch(checkCompletion(file)){
        case 0: return <div style={{display: 'inline-block', width: '.5rem', height: '.5rem', background: 'transparent'}}/>
        case 1: return <div style={{display: 'inline-block', width: '.5rem', height: '.5rem', background: '#888'}}/>;
        case 2: return <div style={{display: 'inline-block', width: '.5rem', height: '.5rem', background: 'blue'}}/>;
        case 3: return <div style={{display: 'inline-block', width: '.5rem', height: '.5rem', background: 'green'}}/>;
    }
    

}

export default StatusBadge