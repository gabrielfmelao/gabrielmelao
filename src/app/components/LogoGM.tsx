import logoGMImage from 'figma:asset/b54d78974c110fef9507accf0c693c69f4db8366.png';

interface LogoGMProps {
  className?: string;
}

export function LogoGM({ className = '' }: LogoGMProps) {
  return (
    <img 
      src={logoGMImage} 
      alt="GM" 
      className={className}
    />
  );
}
