'use client'

import { getMediaUrl } from '@/lib/media'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HeroModernBlockProps {
    title: string
    subtitle?: string | null
    type?: 'video' | 'split' | 'centered'
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    media?: any
    videoUrl?: string | null
    cta?: {
        label?: string | null
        url?: string | null
    }
}

export const HeroModernBlock = ({ title, subtitle, type = 'centered', media, videoUrl, cta }: HeroModernBlockProps) => {
    const mediaUrl = getMediaUrl(media)

    if (type === 'video' && videoUrl) {
        return (
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden text-white">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60 z-10" />

                <div className="container relative z-20 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                    {cta?.url && cta.label && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link
                                href={cta.url}
                                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
                            >
                                {cta.label}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>
        )
    }

    if (type === 'split') {
        return (
            <section className="grid lg:grid-cols-2 min-h-[80vh]">
                <div className="flex items-center justify-center p-12 lg:p-24 bg-background order-2 lg:order-1">
                    <div className="max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold font-serif mb-6 text-foreground"
                        >
                            {title}
                        </motion.h1>
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground mb-8"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                        {cta?.url && cta.label && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <Link
                                    href={cta.url}
                                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
                                >
                                    {cta.label}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
                <div className="relative h-[50vh] lg:h-auto order-1 lg:order-2">
                    {mediaUrl && (
                        <Image
                            src={mediaUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>
            </section>
        )
    }

    // Default Centered
    return (
        <section className="relative py-24 lg:py-32 flex items-center justify-center overflow-hidden bg-background">
            <div className="container relative z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight text-foreground"
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {mediaUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={mediaUrl}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                )}

                {cta?.url && cta.label && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-12"
                    >
                        <Link
                            href={cta.url}
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            {cta.label}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
