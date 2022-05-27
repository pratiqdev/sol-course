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
                title: 'Getting Started (mdx)',
                description: 'The actual intro course...',
                difficulty: 10,
                file: 'intro/straight-mdx'
            },
            {
                title: 'Getting Started (tsx)',
                description: 'The actual intro course...',
                difficulty: 10,
                file: 'intro/standard'
            },
            {
                title: 'Q & A (tsx)',
                description: 'Q&A components',
                difficulty: 10,
                file: 'intro/standard-qa'
            },
            {
                title: 'custom components (tsx)',
                description: 'Q&A components',
                difficulty: 10,
                file: 'intro/standard-custom'
            }

        ]
    },
    {
        title: 'Course 1',
        description: 'All about NFTs',
        difficulty: 10, // out of 100
        tags: ['beginner'],
        restricted: true,
        courses: [
            {
                title: 'What is an NFT',
                description: 'description...',
                difficulty: 10,
                file: 'course-1/protected-page'
            }
        ]
    },
    {
        title: 'Course 2',
        description: 'What is Ethereum and the EVM',
        difficulty: 20, // out of 100
        tags: ['beginner'],
        restricted: true,
        courses: [
            {
                title: 'The solidity language',
                description: 'description...',
                difficulty: 20,
                file: 'course-2/protected-page-2'
            }
        ]
    }
]

export default courseList