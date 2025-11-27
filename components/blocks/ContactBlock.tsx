'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { LexicalRenderer } from '@/components/payload/LexicalRenderer'
import { sendContactEmail } from '@/app/actions'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    phone: z.string().optional(),
    message: z.string().min(10, {
        message: 'Message must be at least 10 characters.',
    }),
})

type Props = {
    title?: string
    introText?: any
}

export const ContactBlock: React.FC<Props> = ({ title, introText }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        setError(null)
        try {
            const result = await sendContactEmail(values)
            if (result.success) {
                setIsSuccess(true)
                form.reset()
            } else {
                setError(result.error || 'Something went wrong. Please try again.')
            }
        } catch {
            setError('An unexpected error occurred.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
                        {introText && (
                            <div className="prose dark:prose-invert mb-8">
                                <LexicalRenderer content={introText} />
                            </div>
                        )}
                    </div>
                    <div className="bg-card p-8 rounded-lg shadow-sm border">
                        {isSuccess ? (
                            <div className="text-center py-12">
                                <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
                                <p className="text-muted-foreground mb-6">
                                    Thank you for contacting us. We will get back to you as soon as possible.
                                </p>
                                <Button onClick={() => setIsSuccess(false)} variant="outline">
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+421 900 000 000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="How can we help you?"
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {error && (
                                        <div className="text-red-500 text-sm">{error}</div>
                                    )}
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
