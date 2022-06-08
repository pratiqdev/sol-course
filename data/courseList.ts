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
                data: null
            },
            '1-2-q&a-example':{
                title: 'Q & A (tsx)',
                file: 'intro/standard-qa',
                data: null
            },
            '1-3-custom-example':{
                title: 'custom components (tsx)',
                file: 'intro/standard-custom',
                data: null
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
                data: null
            },
        }
    },

}
export default courseList