import { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { AccordionBlock } from '../blocks/AccordionBlock'
import { TabsBlock } from '../blocks/TabsBlock'
import { CardGridBlock } from '../blocks/CardGridBlock'
import { CarouselBlock } from '../blocks/CarouselBlock'
import { TimelineBlock } from '../blocks/TimelineBlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { ContactBlock } from '../blocks/ContactBlock'

import { FeaturesBlock } from '../blocks/FeaturesBlock'
import { CTABlock } from '../blocks/CTABlock'
import { LatestPostsBlock } from '../blocks/LatestPostsBlock'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'layout',
            type: 'blocks',
            blocks: [
                HeroBlock,
                ContentBlock,
                GalleryBlock,
                FeaturesBlock,
                CTABlock,
                LatestPostsBlock,
                ContactBlock,
                AccordionBlock,
                TabsBlock,
                CardGridBlock,
                CarouselBlock,
                TimelineBlock,
            ],
            label: 'Page Layout',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            label: 'URL Slug',
            admin: {
                description: 'Example: services/advertising, prezentacia, contact',
            },
            index: true,
        },
        {
            name: 'locale',
            type: 'select',
            required: true,
            options: [
                { label: 'Slovenčina (SK)', value: 'sk' },
                { label: 'English (EN)', value: 'en' },
                { label: 'Deutsch (DE)', value: 'de' },
            ],
            defaultValue: 'sk',
            admin: {
                position: 'sidebar',
            },
            index: true,
        },
        {
            name: 'translationKey',
            type: 'text',
            label: 'Translation Key',
            admin: {
                description: 'Key to link translated pages (e.g., "home", "autoplachty")',
                position: 'sidebar',
            },
            index: true,
        },

        {
            name: 'content',
            type: 'richText',
            required: false,
            label: 'Page Content',
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'Excerpt / Krátky popis',
            admin: {
                description: 'Used for SEO meta description',
            },
        },
        {
            name: 'wpId',
            type: 'number',
            label: 'WordPress ID',
            admin: {
                description: 'Original WordPress page ID (for migration tracking)',
                position: 'sidebar',
                readOnly: true,
            },
        },
        {
            name: 'parent',
            type: 'relationship',
            relationTo: 'pages',
            label: 'Parent Page',
            admin: {
                description: 'For nested pages (e.g., EEA Grants subpages)',
                position: 'sidebar',
            },
        },
        // SEO Fields
        {
            name: 'seo',
            type: 'group',
            label: 'SEO',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'text',
                    label: 'Meta Title',
                },
                {
                    name: 'metaDescription',
                    type: 'textarea',
                    label: 'Meta Description',
                    maxLength: 160,
                },
                {
                    name: 'metaKeywords',
                    type: 'text',
                    label: 'Meta Keywords',
                },
            ],
        },
        // Media Fields
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Featured Image',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'attachments',
            type: 'array',
            label: 'PDF Attachments',
            fields: [
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Display Title',
                },
            ],
        },
    ],
}
