import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import Questionnaire from '@components/Questionnaire'

const CoursePage = () => {

    return(
        <Shell>
            <Instructions>
                <h2>Intro - standard.tsx</h2>

                <p>These are the instructions</p>

                <p>Custom components are easier to use in plain TSX instead of MDX</p>


            </Instructions>

            <Questionnaire 
                qas={[
                    {
                        question: 'A question!!!',
                        answer: 'blaps'
                    },
                    {
                        question: 'Another q & a',
                        answer: 'flap',
                        feedback: 'Offer an explanation'
                    },
                    {
                        question: 'A number question... same as text really',
                        answer: '42'
                    },
                    {
                        type: 'options',
                        question: 'A multiple choice dropdown',
                        options: ['option one!', 'option two...', 'option thr33'],
                        answer: 'option one!'
                    },
                ]}
            />
         
        </Shell>
    )

}

export default CoursePage