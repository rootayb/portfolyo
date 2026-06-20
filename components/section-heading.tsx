type SectionHeadingProps = {
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  )
}
