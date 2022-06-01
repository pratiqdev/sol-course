const courseList = [
    {
        // category
        title: 'Intro',
        description: 'Get familiar with the interface and course options',
        difficulty: 10, // out of 100
        // tags: ['noob', 'beginner'],
        restricted: false,
        // actual courses
        courses: [
            {
                title: 'Getting Started',
                difficulty: 10,
                file: 'intro/getting-started'
            },
            {
                title: 'Q & A (tsx)',
                difficulty: 10,
                file: 'intro/standard-qa'
            },
            {
                title: 'custom components (tsx)',
                difficulty: 10,
                file: 'intro/standard-custom'
            }

        ]
    },
    {
        // category
        title: 'Restricted Test',
        description: 'Testing restricted routes',
        difficulty: 10, // out of 100
        restricted: false,
        // actual courses
        courses: [
            {
                title: 'Restricted!',
                difficulty: 10,
                file: 'restricted-test/getting-started'
            },
     

        ]
    },

]

export default courseList