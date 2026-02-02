import logoFullImage from 'figma:asset/0134d37e23e954cb8be5b73fa715aeb38bc206ed.png';

interface LogoFullProps {
  className?: string;
}

export function LogoFull({ className = '' }: LogoFullProps) {
  return (
    <img 
      src={logoFullImage} 
      alt="Gabriel Melão" 
      className={className}
    />
  );
}
