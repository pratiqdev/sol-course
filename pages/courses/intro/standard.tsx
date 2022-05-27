import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'

const CoursePage = () => {

    return(
        <Shell>
            <Instructions>
                <h2>Intro - standard.tsx</h2>

                <p>These are the instructions</p>

                <p>Custom components are easier to use in plain TSX instead of MDX</p>


            </Instructions>

            <Editor 
            storage='intro/standard'
            code={`// custom code defined in 'standard' - non-mdx file (tsx)`} 
            tests={[
                {test1: 'a test'}
            ]}
            />
        </Shell>
    )

}

export default CoursePage