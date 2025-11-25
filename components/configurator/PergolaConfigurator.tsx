'use client'

import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function PergolaModel({ width, depth, height, color }: { width: number; depth: number; height: number; color: string }) {
    return (
        <group position={[0, height / 2, 0]}>
            {/* Pillars */}
            <mesh position={[-width / 2 + 0.1, 0, -depth / 2 + 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.2, height, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[width / 2 - 0.1, 0, -depth / 2 + 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.2, height, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width / 2 + 0.1, 0, depth / 2 - 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.2, height, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[width / 2 - 0.1, 0, depth / 2 - 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.2, height, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Roof Frame */}
            <mesh position={[0, height / 2 - 0.1, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, 0.2, depth]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Louvers (Lamely) */}
            {Array.from({ length: Math.floor(depth * 5) }).map((_, i) => (
                <mesh
                    key={i}
                    position={[0, height / 2 - 0.1, -depth / 2 + 0.2 + i * 0.2]}
                    rotation={[Math.PI / 4, 0, 0]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[width - 0.4, 0.02, 0.15]} />
                    <meshStandardMaterial color="#e2e8f0" />
                </mesh>
            ))}
        </group>
    )
}

export function PergolaConfigurator() {
    const [width, setWidth] = useState(4)
    const [depth, setDepth] = useState(3)
    const [height, setHeight] = useState(2.5)
    const [color, setColor] = useState('#1e293b') // slate-800

    const colors = [
        { name: 'Antracit', value: '#1e293b' },
        { name: 'Biela', value: '#f8fafc' },
        { name: 'Hnedá', value: '#78350f' },
        { name: 'Strieborná', value: '#94a3b8' },
    ]

    return (
        <div className="flex flex-col lg:flex-row h-[80vh] gap-4">
            {/* 3D View */}
            <div className="flex-1 bg-muted/20 rounded-xl overflow-hidden relative border">
                <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

                        <PergolaModel width={width} depth={depth} height={height} color={color} />

                        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                    </Suspense>
                </Canvas>

                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur p-2 rounded text-xs text-muted-foreground">
                    Drag to rotate • Scroll to zoom
                </div>
            </div>

            {/* Controls */}
            <Card className="w-full lg:w-80 h-fit">
                <CardHeader>
                    <CardTitle>Konfigurátor Pergoly</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Šírka: {width}m</Label>
                        <Slider
                            value={[width]}
                            min={2}
                            max={7}
                            step={0.5}
                            onValueChange={(v: number[]) => setWidth(v[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Hĺbka: {depth}m</Label>
                        <Slider
                            value={[depth]}
                            min={2}
                            max={5}
                            step={0.5}
                            onValueChange={(v: number[]) => setDepth(v[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Výška: {height}m</Label>
                        <Slider
                            value={[height]}
                            min={2}
                            max={3}
                            step={0.1}
                            onValueChange={(v: number[]) => setHeight(v[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Farba konštrukcie</Label>
                        <div className="flex gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c.value}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${color === c.value ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
                                        }`}
                                    style={{ backgroundColor: c.value }}
                                    onClick={() => setColor(c.value)}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-muted-foreground">Odhadovaná cena</span>
                            <span className="text-2xl font-bold">
                                {Math.round(width * depth * 850)} €
                            </span>
                        </div>
                        <Button className="w-full" size="lg">
                            Mám záujem
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
