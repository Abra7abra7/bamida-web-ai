import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('Navigation');
    return (
        <div className="container py-20">
            <h1 className="text-4xl font-bold mb-4">{t('contact')}</h1>
            <p>Obsah stránky sa pripravuje...</p>
            <div className="mt-8">
                <p>Email: info@bamida.sk</p>
                <p>Tel: +421 900 000 000</p>
            </div>
        </div>
    );
}
