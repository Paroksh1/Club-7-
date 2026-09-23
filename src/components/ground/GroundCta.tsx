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
      className={`group inline-flex items-center gap-2 border-t-2 border-c7-red bg-c7-bg-1/90 px-6 py-3.5 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink backdrop-blur-[1px] transition-colors hover:text-c7-red ${className}`}
    >
      {label}
      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
        ↗
      </span>
    </a>
  );
}
