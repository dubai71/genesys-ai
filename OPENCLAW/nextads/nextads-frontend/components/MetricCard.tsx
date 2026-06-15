import { ReactNode } from "react";

interface MetricCardProps {
    title: string;
    value: string;
    trend: number;
    icon: ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
    const isPositive = trend >= 0;
    return (
        <div className="flex flex-col justify-between rounded-xl bg-card p-6 shadow-sm transition-all hover:shadow-card-hover border border-border">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{title}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-primary">
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{value}</span>
                <span
                    className={`text-sm font-medium ${isPositive ? "text-success" : "text-danger"
                        }`}
                >
                    {isPositive ? "+" : ""}{trend}%
                </span>
            </div>
        </div>
    );
}
