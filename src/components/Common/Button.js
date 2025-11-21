import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { getButtonClasses } from '../../theme/themeUtils';

function Button({ link, text, fontSize = 'md', variant = 'secondary', onClick, className = '' }) {
  const { theme } = useTheme();
  const buttonClasses = getButtonClasses(variant, theme, { 
    size: fontSize === 'sm' ? 'sm' : fontSize === 'lg' ? 'lg' : 'md',
    fullWidth: false 
  });

  const baseClasses = `inline-block text-center font-bold ${buttonClasses} shadow-lg hover:shadow-none transition-all ${className}`;

  if (link) {
    return (
      <a 
        href={link} 
        className={baseClasses}
      >
        {text}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={baseClasses}
    >
      {text}
    </button>
  );
};

export default Button;