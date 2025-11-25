import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AISearch } from "./AISearch";

export function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://cdn.coverr.co/videos/coverr-industrial-sewing-machine-5336/1080p.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container relative z-20 text-white text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {t('heroTitle')}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {t('heroSubtitle')}
                </p>

                <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                    <Button size="lg" className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                        {t('cta')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <AISearch />
                </div>
            </div>
        </section>
    );
}
