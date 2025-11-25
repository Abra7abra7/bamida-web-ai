import { useTranslations } from 'next-intl';
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    const t = useTranslations('Navigation');

    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-wider">
                        BAMIDA
                    </Link>
                    <p className="text-muted-foreground">
                        Váš partner pre priemyselné textílie a tieniacu techniku.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-bold mb-4">Navigácia</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">{t('home')}</Link></li>
                        <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">{t('products')}</Link></li>
                        <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('about')}</Link></li>
                        <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('contact')}</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold mb-4">Kontakt</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@bamida.sk</li>
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +421 900 000 000</li>
                        <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Prešov, Slovensko</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
