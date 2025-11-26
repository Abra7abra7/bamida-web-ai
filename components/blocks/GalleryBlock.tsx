'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryBlockProps {
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

export const GalleryBlock = ({ title, images, columns = '3' }: GalleryBlockProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    const gridCols = {
        '2': 'grid-cols-1 sm:grid-cols-2',
        '3': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
        '4': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % images.length)
        }
    }

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
        }
    }

    return (
        <section className="py-12">
            {title && (
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>
            )}

            <div className={cn('grid gap-4', gridCols[columns || '3'])}>
                {images.map((image, index) => (
                    image.url && (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-muted"
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || title || ''}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                        </motion.div>
                    )
                ))}
            </div>

            <AnimatePresence>
                {selectedImageIndex !== null && images[selectedImageIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <button
                            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                            onClick={handleNext}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {images[selectedImageIndex].url && (
                                <Image
                                    src={images[selectedImageIndex].url}
                                    alt={images[selectedImageIndex].alt || ''}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
