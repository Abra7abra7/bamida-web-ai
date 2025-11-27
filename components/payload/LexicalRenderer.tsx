/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'





interface LexicalRendererProps {
    content: any
    className?: string
}

/**
 * Render Lexical JSON content to HTML
 * Supports basic nodes: paragraph, text, heading, list, link
 */
export const LexicalRenderer = ({ content, className = '' }: LexicalRendererProps) => {
    if (!content) return null

    const renderNode = (node: any, index: number): React.ReactNode => {
        // Text node
        if (node.type === 'text') {
            let text: React.ReactNode = node.text || ''

            // Apply text formatting
            if (node.format) {
                if (node.format & 1) text = <strong key={`b-${index}`}>{text}</strong> // Bold
                if (node.format & 2) text = <em key={`i-${index}`}>{text}</em> // Italic
                if (node.format & 8) text = <code key={`c-${index}`}>{text}</code> // Code
            }

            return text
        }

        // Paragraph node
        if (node.type === 'paragraph') {
            return (
                <p key={index} className="mb-4">
                    {node.children?.map((child: any, i: number) => renderNode(child, i))}
                </p>
            )
        }

        // Heading nodes
        if (node.type === 'heading') {
            const tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
            const headingClasses: Record<string, string> = {
                h1: 'text-4xl font-bold mb-6 mt-8',
                h2: 'text-3xl font-bold mb-5 mt-7',
                h3: 'text-2xl font-bold mb-4 mt-6',
                h4: 'text-xl font-bold mb-3 mt-5',
                h5: 'text-lg font-bold mb-2 mt-4',
                h6: 'text-base font-bold mb-2 mt-3',
            }

            return React.createElement(
                tag,
                { key: index, className: headingClasses[tag] || '' },
                node.children?.map((child: any, i: number) => renderNode(child, i))
            )
        }

        // List nodes
        if (node.type === 'list') {
            const ListTag = node.listType === 'number' ? 'ol' : 'ul'
            const listClass = node.listType === 'number'
                ? 'list-decimal list-inside mb-4 ml-4'
                : 'list-disc list-inside mb-4 ml-4'

            return (
                <ListTag key={index} className={listClass}>
                    {node.children?.map((child: any, i: number) => renderNode(child, i))}
                </ListTag>
            )
        }

        if (node.type === 'listitem') {
            return (
                <li key={index} className="mb-2">
                    {node.children?.map((child: any, i: number) => renderNode(child, i))}
                </li>
            )
        }

        // Link node
        if (node.type === 'link') {
            return (
                <a
                    key={index}
                    href={node.url || '#'}
                    className="text-blue-600 hover:text-blue-800 underline"
                    target={node.newTab ? '_blank' : undefined}
                    rel={node.newTab ? 'noopener noreferrer' : undefined}
                >
                    {node.children?.map((child: any, i: number) => renderNode(child, i))}
                </a>
            )
        }

        // Quote/blockquote
        if (node.type === 'quote') {
            return (
                <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
                    {node.children?.map((child: any, i: number) => renderNode(child, i))}
                </blockquote>
            )
        }

        // Code block
        if (node.type === 'code') {
            return (
                <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
                    <code>{node.children?.map((child: any, i: number) => renderNode(child, i))}</code>
                </pre>
            )
        }

        // Horizontal rule
        if (node.type === 'horizontalrule') {
            return <hr key={index} className="my-8 border-gray-300 dark:border-gray-700" />
        }

        // Fallback: render children if they exist
        if (node.children) {
            return (
                <div key={index}>
                    {node.children.map((child: any, i: number) => renderNode(child, i))}
                </div>
            )
        }

        return null
    }

    return (
        <div className={`lexical-content ${className}`}>
            {content.root.children.map((node: any, index: number) => renderNode(node, index))}
        </div>
    )
}
