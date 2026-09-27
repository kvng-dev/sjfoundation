import { LuArrowRight } from 'react-icons/lu';

// variant: "primary" (orange fill) | "outline" (navy outline) | "outline-orange" | "white"
export default function Button({ href, variant = 'primary', arrow = false, children, className = '', ...rest }) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`} {...rest}>
      {children}
      {arrow && <LuArrowRight aria-hidden="true" />}
    </a>
  );
}
