import { notFound } from 'next/navigation'

const articles: Record<string, { title: string; date: string; body: string[] }> = {
  'article-one': {
    title: 'Article title goes here',
    date: 'Jan 2025',
    body: [
      'Good design is rarely noticed. It works, stays out of the way, and leaves the person using it feeling capable rather than impressed. When a product earns a compliment, it usually means something went wrong — the user had to stop and think about the interface instead of the task.',
      'There is a version of this that sounds like humility but is actually a convenient excuse. "We want the product to disappear" can mean careful, user-centred work, or it can mean a refusal to take responsibility for the choices being made. The interface always exists. The question is whether those choices are intentional.',
      'Restraint in design is not the same as absence. It means making the decision to remove, to simplify, to resist the pull of features that serve the roadmap rather than the person. It means trusting that less surface area is easier to understand, easier to maintain, easier to improve.',
      'The hardest part is not knowing when to add. It is knowing when to stop.',
    ],
  },
  'article-two': {
    title: 'Article title goes here',
    date: 'Nov 2024',
    body: [
      'Most products are built around a theory of the user: someone with time, patience, and a clear goal. In reality, people are distracted, uncertain, and using your product between two other things they would rather be doing.',
      'Designing for the ideal user is designing for no one. The better question is what happens when things go wrong — when someone misunderstands the flow, enters the wrong information, or abandons the task halfway through. How does the product respond? Does it punish or recover?',
      'Error states reveal more about a product\'s values than its happy path. A form that clears all input on a failed submission, a password rule that appears only after you\'ve typed the wrong thing, a confirmation email that never arrives — these are design decisions. Someone chose not to fix them.',
      'The most trustworthy products are the ones that seem to expect human behaviour, not optimised behaviour.',
    ],
  },
  'article-three': {
    title: 'Article title goes here',
    date: 'Sep 2024',
    body: [
      'There is a difference between a product that is easy to learn and a product that is easy to use. They are not the same thing, and optimising for one often comes at the cost of the other.',
      'A product can be easy to learn because it follows familiar patterns, uses obvious labels, and never surprises. It is also often slow. Once a user knows what they are doing, the scaffolding that helped them at the start becomes friction. The tooltip that explained the feature on day one is in the way on day thirty.',
      'The inverse is also true. A product built for experts is opaque to newcomers. Dense interfaces reward investment but punish exploration. The user has to commit before they understand.',
      'Most products need both. The question is not which to choose but where to put the seams — which parts of the experience reward learning, and which parts should stay simple forever.',
    ],
  },
  'article-four': {
    title: 'Article title goes here',
    date: 'Jun 2024',
    body: [
      'The first version of anything is a guess. You have a theory about what people need, and you build something that tests that theory. Most of the time, you are partly right. The important thing is figuring out which part.',
      'This sounds obvious but it changes how you should think about early product work. If the first version is a test, then shipping it quickly is not cutting corners — it is doing the job. Spending months refining a guess does not make it less of a guess.',
      'What changes with time and care is not the validity of the theory but the cost of being wrong. A polished product that solves the wrong problem is harder to change than a rough one. The investment makes it harder to see clearly.',
      'Ship early to learn. Polish what you know is right.',
    ],
  },
  'article-five': {
    title: 'Article title goes here',
    date: 'Mar 2024',
    body: [
      'Collaboration between design and engineering works best when both sides are curious about the other\'s constraints. It breaks down when one side treats the other as a service provider.',
      'Designers who do not understand what is hard to build make requests that seem arbitrary to engineers. Engineers who do not understand what is hard to perceive make implementation decisions that seem arbitrary to designers. The gap is not skill — it is shared context.',
      'The best products I have worked on had no clear line between where design ended and engineering began. Someone would sketch something at a whiteboard and someone else would say "we could do that differently and it would behave better" and the sketch would change. The idea got stronger because two people with different knowledge were looking at it at the same time.',
      'Process can simulate this but it cannot replace it. Handoffs are a tax on collaboration.',
    ],
  },
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) notFound()

  return (
    <main className="flex-1 flex flex-col px-6 pb-16">
      <div className="pt-[28vh]">
          <h1
            className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center text-balance"
            style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
          >
            {article.title}
          </h1>
        <p className="text-sm text-[#888] mt-3 text-center">{article.date}</p>
      </div>

      <div className="mt-16 space-y-6 text-base leading-relaxed text-[#1C1C1C] max-w-prose mx-auto w-full">
        {article.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

    </main>
  )
}
