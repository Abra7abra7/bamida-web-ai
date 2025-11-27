/* eslint-disable @typescript-eslint/no-explicit-any */
import { GalleryBlock } from './GalleryBlock'
import { ContentBlock } from './ContentBlock'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CTABlock } from './CTABlock'
import { LatestPostsBlock } from './LatestPostsBlock'
import { AccordionBlock } from './AccordionBlock'
import { TabsBlock } from './TabsBlock'
import { CardGridBlock } from './CardGridBlock'
import { CarouselBlock } from './CarouselBlock'
import { TimelineBlock } from './TimelineBlock'
import { ContactBlock } from './ContactBlock'

interface BaseBlock {
    blockType: string
    id?: string
}

interface GalleryBlockData extends BaseBlock {
    blockType: 'gallery'
    title?: string | null
    images: Array<{
        id: string
        url?: string | null
        alt?: string | null
        width?: number | null
        height?: number | null
    }>
    columns?: '2' | '3' | '4' | null
}

interface ContentBlockData extends BaseBlock {
    blockType: 'content'
    content: any
}

interface HeroBlockData extends BaseBlock {
    blockType: 'hero'
    title: string
    subtitle?: string | null
    backgroundImage?: {
        url?: string | null
        alt?: string | null
    } | null
    type?: 'default' | 'large' | 'minimal' | null
    showSearch?: boolean | null
}

interface FeaturesBlockData extends BaseBlock {
    blockType: 'features'
    title?: string | null
    description?: string | null
    items: Array<{
        title: string
        text?: string | null
        icon?: 'star' | 'shield' | 'zap' | 'heart' | 'check' | 'trophy' | null
        id?: string | null
    }>
}

interface CTABlockData extends BaseBlock {
    blockType: 'cta'
    title: string
    text?: string | null
    links: Array<{
        label: string
        url: string
        type?: 'primary' | 'secondary' | 'outline' | null
        id?: string | null
    }>
    style?: 'default' | 'boxed' | 'full' | null
}

interface LatestPostsBlockData extends BaseBlock {
    blockType: 'latestPosts'
    title?: string | null
    limit?: number | null
    showDate?: boolean | null
}

interface ContactBlockData extends BaseBlock {
    blockType: 'contact'
    title?: string
    introText: any
}

interface AccordionBlockData extends BaseBlock {
    blockType: 'accordion'
    title?: string | null
    items: Array<{
        trigger: string
        content: string
    }>
}

interface TabsBlockData extends BaseBlock {
    blockType: 'tabs'
    title?: string | null
    tabs: Array<{
        label: string
        content: any // RichText
    }>
}

interface CardGridBlockData extends BaseBlock {
    blockType: 'cardGrid'
    title?: string | null
    description?: string | null
    cards: Array<{
        title: string
        description?: string | null
        image?: { url?: string | null; alt?: string | null } | null
        link?: string | null
        linkText?: string | null
    }>
}

interface CarouselBlockData extends BaseBlock {
    blockType: 'carousel'
    title?: string | null
    items: Array<{
        image: { url?: string | null; alt?: string | null }
        text?: string | null
    }>
}

interface TimelineBlockData extends BaseBlock {
    blockType: 'timeline'
    title?: string | null
    items: Array<{
        year: string
        title: string
        description: string
    }>
}

type Block =
    | GalleryBlockData
    | ContentBlockData
    | HeroBlockData
    | FeaturesBlockData
    | CTABlockData
    | LatestPostsBlockData
    | ContactBlockData
    | AccordionBlockData
    | TabsBlockData
    | CardGridBlockData
    | CarouselBlockData
    | TimelineBlockData
    | BaseBlock

interface BlocksRendererProps {
    blocks: Block[]
}

export const BlocksRenderer = ({ blocks }: BlocksRendererProps) => {
    if (!blocks || blocks.length === 0) return null

    return (
        <>
            {blocks.map((block, index) => {
                const { blockType } = block

                switch (blockType) {
                    case 'gallery':
                        return <GalleryBlock key={index} {...(block as GalleryBlockData)} />
                    case 'contact': // Added/moved case for ContactBlock
                        return <ContactBlock key={index} {...(block as ContactBlockData)} />
                    case 'content':
                        return <ContentBlock key={index} {...(block as ContentBlockData)} />
                    case 'hero':
                        return <HeroBlock key={index} {...(block as HeroBlockData)} />
                    case 'features':
                        return <FeaturesBlock key={index} {...(block as FeaturesBlockData)} />
                    case 'cta':
                        return <CTABlock key={index} {...(block as CTABlockData)} />
                    case 'latestPosts':
                        return <LatestPostsBlock key={index} {...(block as LatestPostsBlockData)} />

                    case 'accordion':
                        return <AccordionBlock key={index} {...(block as AccordionBlockData)} />
                    case 'tabs':
                        return <TabsBlock key={index} {...(block as any)} />
                    case 'cardGrid':
                        return <CardGridBlock key={index} {...(block as CardGridBlockData)} />
                    case 'carousel':
                        return <CarouselBlock key={index} {...(block as CarouselBlockData)} />
                    case 'timeline':
                        return <TimelineBlock key={index} {...(block as TimelineBlockData)} />
                    default:
                        return null
                }
            })}
        </>
    )
}
