interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  className = "",
  titleClassName = "text-2xl md:text-3xl lg:text-4xl",
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-4xl text-center ${className}`}>
      {label && (
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
          {label}
        </span>
      )}
      <h2 className={`font-bold text-foreground ${titleClassName}`}>
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
