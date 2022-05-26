import Link from 'next/link'
import courseList from '@data/courseList'

const Courses = (props) => {


    return(
        <>
            <h1>Course List ({courseList.length})</h1>

            {courseList.map(x => (
                <div key={x.title}>
                    <h3>{x.title}</h3>
                    <p>Difficulty: {x.difficulty}</p>
                    <p>{x.description}</p>
                    <Link href={'/courses/' + x.courses[0].file}>Start</Link>
                </div>
            ))}
        </>
    )
}

export default Courses