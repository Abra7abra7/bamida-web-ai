import React from 'react'
import { PergolaConfigurator } from '@/components/configurator/PergolaConfigurator'

export default function ConfiguratorPage() {
    return (
        <div className="container py-10">
            <h1 className="text-4xl font-bold font-serif mb-2">3D Konfigurátor</h1>
            <p className="text-muted-foreground mb-8">
                Navrhnite si vlastnú bioklimatickú pergolu presne podľa vašich predstáv.
            </p>

            <PergolaConfigurator />
        </div>
    )
}
