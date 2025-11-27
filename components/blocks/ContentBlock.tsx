/* eslint-disable @typescript-eslint/no-explicit-any */
import { LexicalRenderer } from '../payload/LexicalRenderer'

interface ContentBlockProps {
    content: any
}

export const ContentBlock = ({ content }: ContentBlockProps) => {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto py-12">
            <LexicalRenderer content={content} />
        </div>
    )
}
