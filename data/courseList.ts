import { ICourseCategoryObject, ICourseListObject } from "@utils/types"

const courseList: ICourseListObject = {

    'intro':{
        title: 'Intro',
        description: 'Get familiar with the interface and course options',
        difficulty: 10, // out of 100
        restricted: false,
        // actual courses
        courses: {
            'getting-started':{
                title: 'Getting Started',
                file: 'intro/getting-started',
            },
            '1-2-q&a-example':{
                title: 'Q & A (tsx)',
                file: 'intro/standard-qa',
            },
            '1-3-custom-example':{
                title: 'custom components (tsx)',
                file: 'intro/standard-custom',
            },
            '1-4-intro-test':{
                title: 'Intro Test',
                file: 'intro/intro-test',
            }
        }
    },
    'restricted-test':{
        title: 'Restricted Test',
        description: 'Testing restricted routes',
        difficulty: 10, // out of 100
        restricted: true,
        // actual courses
        courses: {
            '2-1-restricted-course-example':{
                title: 'Restricted!',
                file: 'restricted-test/getting-started',
            },
        }
    },
    'solidity-basics':{
        title: 'Solidity Basics',
        description: 'An introduction to the features and structure of the Solidity language',
        difficulty: 10, // out of 100
        restricted: false,
        // actual courses
        courses: {
            '1':{
                title: 'Contract Definition',
                file: 'solidity-basics/contract-definition',
            },
            '2':{
                title: 'Getting Started',
                file: 'solidity-basics/getting-started',
            },
            '3':{
                title: 'First Steps',
                file: 'solidity-basics/first-steps',
            },
        }
    },
    'transactions':{
        title: 'Transactions',
        description: 'Contract interactions and events',
        difficulty: 10, // out of 100
        restricted: false,
        // actual courses
        courses: {
            '1':{
                title: 'Intro to Transactions',
                file: 'transactions/intro-to-transactions',
            },
  
        }
    },
    'smart-contract-intro':{
        title: 'Smart Contract Intro',
        description: 'Get familiar with Smart Contract concepts',
        difficulty: 20, // out of 100
        restricted: false,
        // actual courses
        courses: {
            '1':{
                title: 'Getting Started',
                file: 'smart-contract-intro/getting-started',
            },
            '2':{
                title: 'Contract Variables',
                file: 'smart-contract-intro/contract-variables',
            },
            '3':{
                title: 'Contract Data',
                file: 'smart-contract-intro/contract-data',
            },
            '4':{
                title: 'Contract Arrays',
                file: 'smart-contract-intro/contract-arrays',
            },
            '5':{
                title: 'Contract Functions',
                file: 'smart-contract-intro/contract-functions',
            },
            '6':{
                title: '',
                file: 'smart-contract-intro/',
            },
  
        }
    },

}
export default courseList