import { Hero } from '@/components/home/Hero'
import { BentoGrid } from '@/components/home/BentoGrid'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domov',
  description: 'Bamida - Inovácie v priemyselných textíliách a tieniacej technike od roku 1995.',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BentoGrid />

      {/* Additional sections can be added here */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-serif mb-6">Prečo Bamida?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sme lídrom v oblasti technických textílií a tieniacej techniky na Slovensku.
            Kombinujeme 20 rokov skúseností s najmodernejšími technológiami.
          </p>
        </div>
      </section>
    </div>
  )
}
