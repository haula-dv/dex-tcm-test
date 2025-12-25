'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function ThemeDemo() {
    return (
        <div style={{
            padding: '2rem',
            minHeight: '100vh',
            backgroundColor: 'rgb(var(--oui-color-background))',
            color: 'rgb(var(--oui-color-base-foreground))'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    padding: '1rem',
                    backgroundColor: 'rgb(var(--oui-color-fill))',
                    borderRadius: 'var(--oui-rounded-lg)'
                }}>
                    <h1 style={{ margin: 0, fontSize: '2rem' }}>Custom Theme Demo</h1>
                    <ThemeToggle />
                </div>

                {/* Color Palette */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2>Base Colors</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(level => (
                            <div key={level} style={{
                                padding: '1rem',
                                backgroundColor: `rgb(var(--oui-color-base-${level}))`,
                                borderRadius: 'var(--oui-rounded)',
                                border: '1px solid rgb(var(--oui-color-divider))',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Base {level}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Primary Colors */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2>Primary & Semantic Colors</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <ColorCard title="Primary" color="var(--oui-color-primary)" />
                        <ColorCard title="Link" color="var(--oui-color-link)" />
                        <ColorCard title="Success" color="var(--oui-color-success)" />
                        <ColorCard title="Danger" color="var(--oui-color-danger)" />
                        <ColorCard title="Warning" color="var(--oui-color-warning)" />
                    </div>
                </div>

                {/* Buttons */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2>Buttons</h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'rgb(var(--oui-color-primary))',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--oui-rounded)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>Primary Button</button>

                        <button style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'rgb(var(--oui-color-success))',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--oui-rounded)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>Success Button</button>

                        <button style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'rgb(var(--oui-color-danger))',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--oui-rounded)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>Danger Button</button>
                    </div>
                </div>

                {/* Trading Colors */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2>Trading Colors</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: 'rgb(var(--oui-color-trading-profit))',
                            color: 'rgb(var(--oui-color-trading-profit-contrast))',
                            borderRadius: 'var(--oui-rounded-lg)',
                            flex: 1,
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>+12.5%</div>
                            <div>Profit</div>
                        </div>
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: 'rgb(var(--oui-color-trading-loss))',
                            color: 'rgb(var(--oui-color-trading-loss-contrast))',
                            borderRadius: 'var(--oui-rounded-lg)',
                            flex: 1,
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>-8.3%</div>
                            <div>Loss</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ColorCard({ title, color }: { title: string; color: string }) {
    return (
        <div style={{
            padding: '2rem 1rem',
            backgroundColor: `rgb(${color})`,
            color: 'white',
            borderRadius: 'var(--oui-rounded-lg)',
            textAlign: 'center',
            fontWeight: 'bold',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
            {title}
        </div>
    );
}
