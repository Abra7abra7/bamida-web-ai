import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('Navigation');
    return (
        <div className="container py-20">
            <h1 className="text-4xl font-bold mb-4">{t('about')}</h1>
            <p>Obsah stránky sa pripravuje...</p>
        </div>
    );
}
