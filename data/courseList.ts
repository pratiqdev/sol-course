const courseList = [
    {
        // category
        title: 'Intro',
        description: 'This is a description for this category...',
        difficulty: 10, // out of 100
        tags: ['noob', 'beginner'],
        restricted: false,
        // actual courses
        courses: [
            {
                title: 'Getting Started',
                description: 'The actual intro course...',
                difficulty: 10,
                file: 'intro/straight-mdx'
            }
        ]
    }
]

export default courseList