interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="px-6 pb-20">
      <p className="text-sm text-[#888] mt-8 mb-2">Project</p>
      <h1 className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 mb-16 max-w-sm">
        {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      </h1>

      <div className="w-full h-72 bg-[#d4d4d4] rounded-sm mb-12" />

      <div className="max-w-sm space-y-6 text-base leading-relaxed text-[#1C1C1C]">
        <p>Project overview and description will go here.</p>
      </div>
    </main>
  )
}
