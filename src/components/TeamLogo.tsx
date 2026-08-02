import React from 'react';

interface TeamLogoProps {
  logo: string;
  name: string;
  className?: string;
  fallbackEmoji?: string;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({
  logo,
  name,
  className = 'w-6 h-6',
  fallbackEmoji = '⚽'
}) => {
  const isUrl = logo && (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/'));

  if (isUrl) {
    return (
      <img
        src={logo}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${className} object-contain inline-block shrink-0`}
        onError={(e) => {
          // If image fails to load, replace with text emoji
          const parent = e.currentTarget.parentElement;
          if (parent) {
            e.currentTarget.style.display = 'none';
            const span = document.createElement('span');
            span.className = 'text-xl leading-none';
            span.textContent = fallbackEmoji;
            parent.appendChild(span);
          }
        }}
      />
    );
  }

  return <span className="text-xl leading-none shrink-0 inline-block">{logo || fallbackEmoji}</span>;
};
