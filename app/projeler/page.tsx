import type { Metadata } from 'next'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projeler',
  description:
    'Alperen Yiğit Bulat tarafından geliştirilen dijital çözüm projeleri.',
}

export default function ProjectsPage() {
  return (
    <main className="section">
      <div className="container">
        <SectionHeading
          title="Projeler"
          description="Özel eğitim, erişilebilirlik ve üretken araçlar çevresinde geliştirdiğim fikirler ve yayınladığım işler."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
