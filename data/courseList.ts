import { ICourseCategoryObject, ICourseListObject } from "@utils/types"

const courseList: ICourseListObject = {

    '1-x-introduction-category-example':{
        // category
        title: 'Intro',
        description: 'Get familiar with the interface and course options',
        difficulty: 10, // out of 100
        // tags: ['noob', 'beginner'],
        restricted: false,
        // actual courses
        courses: {
            '1-1-getting-started-example':{
                title: 'Getting Started',
                file: 'intro/getting-started'
            },
            '1-2-q&a-example':{
                title: 'Q & A (tsx)',
                file: 'intro/standard-qa'
            },
            '1-3-custom-example':{
                title: 'custom components (tsx)',
                file: 'intro/standard-custom'
            }

        }
    },
    '2-x-restricted-category-example':{
        // category
        title: 'Restricted Test',
        description: 'Testing restricted routes',
        difficulty: 10, // out of 100
        restricted: true,
        // actual courses
        courses: {
            '2-1-restricted-course-example':{
                title: 'Restricted!',
                file: 'restricted-test/getting-started'
            },
        }
    },

}
export default courseList