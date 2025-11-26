import { Block } from 'payload'

export const LatestPostsBlock: Block = {
    slug: 'latestPosts',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Latest News',
        },
        {
            name: 'limit',
            type: 'number',
            defaultValue: 3,
            min: 1,
            max: 9,
        },
        {
            name: 'showDate',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
}
