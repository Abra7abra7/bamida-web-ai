import { GalleryBlock } from './GalleryBlock'
import { ContentBlock } from './ContentBlock'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CTABlock } from './CTABlock'
import { LatestPostsBlock } from './LatestPostsBlock'

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

type Block =
    | GalleryBlockData
    | ContentBlockData
    | HeroBlockData
    | FeaturesBlockData
    | CTABlockData
    | LatestPostsBlockData
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
                    default:
                        return null
                }
            })}
        </>
    )
}
