type GroundCtaProps = {
  label: string;
  href: string;
  className?: string;
};

/**
 * Stadium-signage-plate CTA — a plaque bolted to the field boundary,
 * not a rounded button. Sharp corners, thin top rule, red text.
 */
export default function GroundCta({ label, href, className = "" }: GroundCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group items-center gap-2 border-t-2 border-c7-red bg-c7-bg-1/85 px-5 py-3 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink hover:text-c7-red transition-colors ${className}`}
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
