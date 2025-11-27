'use client'

import { getMediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

interface GalleryMasonryBlockProps {
    title?: string | null
    description?: string | null
    images: Array<{
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        image: any
        category?: string | null
        caption?: string | null
    }>
}

export const GalleryMasonryBlock = ({ title, description, images }: GalleryMasonryBlockProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))]

    const filteredImages = selectedCategory === 'all'
        ? images
        : images.filter(img => img.category === selectedCategory)

    return (
        <section className="py-24 bg-background">
            <div className="container px-4">
                <div className="text-center mb-12">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-foreground">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            {description}
                        </p>
                    )}

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category as string)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    selectedCategory === category
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                            >
                                {category === 'all' ? 'All' : (category as string).charAt(0).toUpperCase() + (category as string).slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Grid */}
                <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    <AnimatePresence>
                        {filteredImages.map((item, index) => {
                            const imageUrl = getMediaUrl(item.image)
                            if (!imageUrl) return null

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={index}
                                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                                    onClick={() => setSelectedImage(imageUrl)}
                                >
                                    <div className="relative w-full h-auto">
                                        <Image
                                            src={imageUrl}
                                            alt={item.caption || 'Gallery image'}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <ZoomIn className="text-white w-8 h-8" />
                                        </div>
                                    </div>
                                    {item.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-sm font-medium">{item.caption}</p>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-10 h-10" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-6xl max-h-[90vh] aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Full size"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
