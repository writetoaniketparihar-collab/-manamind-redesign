interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-4xl text-center ${className}`}>
      {label && (
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
