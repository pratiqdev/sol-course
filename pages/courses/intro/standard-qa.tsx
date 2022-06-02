import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import Questionnaire from '@components/Questionnaire'

const CoursePage = () => {

    return(
        <Shell categoryIndex={0}>
            <Instructions>
                <h2>Intro - standard.tsx</h2>

                <p>These are the instructions</p>

                <p>Custom components are easier to use in plain TSX instead of MDX</p>


            </Instructions>

            <Questionnaire 
                qas={[
                    {
                        question: 'A question!!!',
                        answer: 'blaps',
                        feedback: {
                            response:'The answer is "blaps". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }

                    },
                    {
                        question: 'Another q & a',
                        answer: 'flap',
                        feedback: {
                            response:'The answer is "flap". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                    {
                        question: 'A number question... same as text really',
                        answer: '42',
                        feedback: {
                            response:'The answer is "42". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                    {
                        type: 'options',
                        question: 'A multiple choice dropdown',
                        options: ['option one!', 'option two...', 'option thr33'],
                        answer: 'option one!',
                        feedback: {
                            response:'The answer is "option one!". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                ]}
            />
         
        </Shell>
    )

}

export default CoursePage