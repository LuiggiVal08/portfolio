import { useEffect, useState } from 'react';

interface Props {
  roles: string[];
}

export default function Rotator({ roles }: Props) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setFading(false);
      }, 350);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span
      className="inline-block text-accent transition-opacity duration-300 ease-out"
      style={{ opacity: fading ? 0 : 1 }}
      aria-live="polite"
    >
      {roles[index]}
    </span>
  );
}
