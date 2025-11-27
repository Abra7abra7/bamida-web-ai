import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    const t = useTranslations('Navigation');
    const currentLocale = useLocale();

    // Helper to get localized slug (reused from Header, ideally should be a shared hook)
    const getSlug = (key: string) => {
        const slugs: Record<string, Record<string, string>> = {
            'reklama': { sk: '/reklama', en: '/advertising', de: '/werbung' },
            'reklama_grafika': { sk: '/reklama/grafika', en: '/advertising/graphics', de: '/werbung/grafik' },
            'reklama_digitalna_tlac': { sk: '/reklama/digitalna-tlac', en: '/advertising/digital-printing', de: '/werbung/digitaldruck' },
            'reklama_sklenene_produkty': { sk: '/reklama/sklenene-produkty', en: '/advertising/glass-products', de: '/werbung/glasprodukte' },
            'reklama_malovana_reklama': { sk: '/reklama/malovana-reklama', en: '/advertising/painted-advertising', de: '/werbung/gemalte-werbung' },
            'technicke_textilie': { sk: '/technicke-textilie', en: '/technical-textiles', de: '/technische-textilien' },
            'technicke_textilie_autoplachty': { sk: '/technicke-textilie/autoplachty', en: '/technical-textiles/car-tarpaulins', de: '/technische-textilien/lkw-planen' },
            'technicke_textilie_priemysel': { sk: '/technicke-textilie/priemysel', en: '/technical-textiles/for-industry', de: '/technische-textilien/fuer-industrie' },
            'technicke_textilie_polnohospodarstvo': { sk: '/technicke-textilie/polnohospodarstvo', en: '/technical-textiles/agriculture', de: '/technische-textilien/landwirtschaft' },
            'technicke_textilie_stropne_pohlady': { sk: '/technicke-textilie/stropne-pohlady', en: '/technical-textiles/ceiling-views', de: '/technische-textilien/deckenansichten' },
        };
        const lang = ['sk', 'en', 'de'].includes(currentLocale) ? currentLocale : 'sk';
        return slugs[key]?.[lang] || '/';
    };

    return (
        <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-white/10">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                {/* Brand */}
                <div className="space-y-4 lg:col-span-1">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-wider block text-white">
                        BAMIDA
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {t('partner_text')}
                    </p>
                    <div className="flex gap-4 pt-2">
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                    </div>
                </div>

                {/* Reklama */}
                <div>
                    <h3 className="font-bold mb-4 text-lg text-white">{t('reklama')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href={`/${currentLocale}${getSlug('reklama_grafika')}`} className="text-slate-400 hover:text-white transition-colors">{t('reklama_grafika')}</Link></li>
                        <li><Link href={`/${currentLocale}${getSlug('reklama_digitalna_tlac')}`} className="text-slate-400 hover:text-white transition-colors">{t('reklama_digitalna_tlac')}</Link></li>
                        <li><Link href={`/${currentLocale}${getSlug('reklama_sklenene_produkty')}`} className="text-slate-400 hover:text-white transition-colors">{t('reklama_sklenene_produkty')}</Link></li>
                        <li><Link href={`/${currentLocale}${getSlug('reklama_malovana_reklama')}`} className="text-slate-400 hover:text-white transition-colors">{t('reklama_malovana_reklama')}</Link></li>
                    </ul>
                </div>

                {/* Technické Textílie */}
                <div>
                    <h3 className="font-bold mb-4 text-lg text-white">{t('technicke_textilie')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href={`/${currentLocale}${getSlug('technicke_textilie_autoplachty')}`} className="text-slate-400 hover:text-white transition-colors">{t('technicke_textilie_autoplachty')}</Link></li>
                        <li><Link href={`/${currentLocale}${getSlug('technicke_textilie_priemysel')}`} className="text-slate-400 hover:text-white transition-colors">{t('technicke_textilie_priemysel')}</Link></li>
                        <li><Link href={`/${currentLocale}${getSlug('technicke_textilie_polnohospodarstvo')}`} className="text-slate-400 hover:text-white transition-colors">{t('technicke_textilie_polnohospodarstvo')}</Link></li>
                        <li><Link href={`/${currentLocale}${getSlug('technicke_textilie_stropne_pohlady')}`} className="text-slate-400 hover:text-white transition-colors">{t('technicke_textilie_stropne_pohlady')}</Link></li>
                    </ul>
                </div>

                {/* Rýchle odkazy */}
                <div>
                    <h3 className="font-bold mb-4 text-lg text-white">{t('rychle_odkazy')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">{t('home')}</Link></li>
                        <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">{t('about')}</Link></li>
                        <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">{t('kontakt')}</Link></li>
                        <li><Link href="/gdpr" className="text-slate-400 hover:text-white transition-colors">GDPR</Link></li>
                    </ul>
                </div>

                {/* Kontakt */}
                <div>
                    <h3 className="font-bold mb-4 text-lg text-white">{t('kontakt')}</h3>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex items-start gap-3">
                            <Mail className="w-4 h-4 mt-1 shrink-0" />
                            <span className="break-all">info@bamida.sk</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-4 h-4 mt-1 shrink-0" />
                            <span>+421 900 000 000</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 mt-1 shrink-0" />
                            <span>Prešov, Slovensko</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container pt-8 border-t border-white/10 text-center text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} BAMIDA. All rights reserved.</p>
            </div>
        </footer>
    );
}
