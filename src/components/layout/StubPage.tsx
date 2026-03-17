export function StubPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-text-muted">{description}</p>
        <div className="mt-8 inline-block rounded-full border border-primary/30 px-6 py-2 text-sm text-primary">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
