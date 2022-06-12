import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CodeBlock from '@instructions/CodeBlock'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'
import FinalTest from '@components/FinalTest'

const CoursePage = () => {

    return(
        <Shell categoryIndex={0}>

            

<FinalTest 
    categoryUri='intro'
    courseUri='intro-test'
    title='Intro Test'
    subtitle='show suggestions and links before the test (if they exist)'
    qas={[
        {
            question: 'A question!!!',
            answer: 'blaps',
            feedback: 'The answer is BLAPS!!'
        },
        {
            question: 'What is the meaning of everything',
            answer: '42',
            feedback: 'You should know this!'
        },
        {
            question: 'A question!!!',
            answer: 'option 3',
            options: [
                'option 1',
                'option 2',
                'option 3',
            ],
            feedback: 'So many options!!!'
        },
    ]}
/>




        </Shell>
    )

}

export default CoursePage