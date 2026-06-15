import React from 'react';
import * as Lucide from 'lucide-react';
import { cn } from '../../lib/utils';

type IconName = keyof typeof Lucide;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  active?: boolean;
  filled?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className,
  active = false,
  filled = false,
}) => {
  const LucideIcon = Lucide[name] as React.ComponentType<{ size?: number; className?: string; fill?: string }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      className={cn(
        'icon',
        className,
        active && !filled ? 'text-primary-red' : '',
        active && filled ? 'fill-primary-red text-primary-red' : 'text-soft-gray'
      )}
      fill={active && filled ? 'currentColor' : 'none'}
    />
  );
};

export default Icon;
