'use client'

import { getMediaUrl } from '@/lib/media'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface StatsBlockProps {
    items: Array<{
        value: string
        label: string
        description?: string | null
    }>
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    backgroundImage?: any
}

export const StatsBlock = ({ items, backgroundImage }: StatsBlockProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const bgUrl = getMediaUrl(backgroundImage)

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {bgUrl ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={bgUrl}
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-primary z-0" />
            )}

            <div className="container relative z-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-primary-foreground"
                        >
                            <div className="text-5xl md:text-6xl font-bold font-serif mb-2 tracking-tight">
                                {item.value}
                            </div>
                            <div className="text-lg font-medium mb-2 opacity-90">
                                {item.label}
                            </div>
                            {item.description && (
                                <div className="text-sm opacity-70 max-w-[200px] mx-auto">
                                    {item.description}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
