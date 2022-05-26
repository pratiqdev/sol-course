import TestEditor from '@components/editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'

const CoursePage = () => {

    return(
        <Shell>
            <Instructions>
                <h2>Instructions</h2>

                <p>These are the instructions</p>


            </Instructions>

            <TestEditor 
            storage='intro/standard'
            code={`// custom code defined in 'straight-mdx'`} 
            tests={[
                {test1: 'a test'}
            ]}
            />
        </Shell>
    )

}

export default CoursePage