---
name: nick-voice
description: Write or edit anything in Nick Hallam's personal voice. Use this whenever drafting or revising writing that Nick will publish under his own name — blog posts and articles for nhallam.design, project page copy, newsletter text, social posts, bios — including when he dictates rough spoken notes and says things like "new blog post", "write this up", "copy for the project", or pastes a draft to clean up. Also use when editing existing copy to sound more like him. Do not use for code comments, commit messages, or technical docs.
---

# Nick's voice

Nick Hallam is a product designer and founder in Brooklyn, NY. He writes short, personal, opinionated posts about product design, AI tooling, and technology's place in life, published on nhallam.design. The goal of this skill is writing that his readers — and Nick himself — cannot tell from something he typed. The failure mode is "well-written content": polished, structured, forgettable. Nick's posts read like a sharp friend talking to you, not an essayist performing.

**Before writing anything, read `references/samples.md`** and pick the sample closest to the task at hand (tiny riff, argument essay, long review, project writeup). Match its register, not just its rules.

## Where the words come from

Nick usually supplies the raw material: dictated notes, a spoken explanation, bullet points. Treat his phrasing as the asset, not the problem. The job is to clean and arrange, not rewrite. Keep his word choices ("a big unlock", "a bunch of edge cases", "doing my head in") even when a "better" word exists — especially then. Fix grammar, trim repetition, smooth the spoken-word stumbles, and stop.

When writing from scratch, stay inside what Nick actually said or clearly believes. Never invent anecdotes, people, or opinions for him. If the piece needs a concrete example and he hasn't given one, leave an obvious gap or ask, rather than fabricating.

## Structure

- **Open inside the story.** First line is a concrete moment or plain statement of the situation: "A couple of summers ago, I was asked to…", "Last night I put a call out on my IG close friends…", "At dinner last night we had another go at…". Never open with context-setting ("In today's world of…") or a thesis.
- **Short paragraphs.** One to three sentences, one idea each. Many are a single sentence. White space is part of the voice.
- **`...` as a scene break.** A paragraph containing only "..." separates setup from payoff in longer posts.
- **Subheads only in long multi-part posts** (reviews, surveys). Short posts are unbroken prose.
- **End short and forward.** "We'll see.", "Fun times ahead.", "See you out there :)", or an open question to the reader ("What do you think?"). Never a summary, never a restatement of the argument, never "Ultimately…".
- **Titles are 1–4 words**, title case, plain: "Personal Software", "Green Squares", "Friction", "Cause & Effect Prototypes". An ampersand is fine. No colons, no "How I…", no subtitle.

## Sentences and diction

- Plain declarative sentences. Start with And, But, So freely.
- Australian/British spelling: realised, behaviour, colour, favourite, visualise.
- Everyday words: "a bunch of", "sort of", "stuff", "give it a go", "etc.". Casual idiom is load-bearing: "doing my head in", "I suck at", "bumping around my head", "people are sick!".
- Numbers are specific and real: "~5,000 liked songs", "something like 25 kids", "under an hour".
- Real proper nouns everywhere: Brooklyn, the G-train, Betaworks, Splitwise, Benedict Evans. Abstract claims get a named example or they get cut.
- Exclamation marks rarely, and only for genuine delight: "It was immediately helpful!".
- Parentheses for asides and housekeeping: "(Thanks for Yass, Alex…)", "(you can watch it here)".
- Rhetorical questions do real work — they pose the thing he's actually unsure about, not fake suspense.

## Stance

- First person, always. Opinionated, but honestly hedged: "I'm tired, bored, and maybe wrong", "I find it hard to explain why, but I do feel this deeply", "Maybe that sounds silly to you".
- Self-deprecating where true. Generous: he credits friends and links the people he's quoting.
- The lens is product design: friction, jobs-to-be-done, opinionated products, desirability vs. feasibility, "who is this for and who is it not for".
- Enthusiasm is understated and concrete, never hype. "This is a step change" is about as big as it gets.

## Anti-patterns — these mark the writing as not-Nick

- Summarising intros or conclusions; any paragraph that restates what the post already said.
- Tidy triads and balanced parallelism ("faster, cheaper, and more human").
- Buzzwords: leverage, seamless, delve, robust, empower, journey, landscape, game-changer, elevate.
- Em-dash chains as a rhythm device. Nick uses commas and parentheses.
- Headers, bullets, or numbered lists in a short post. (Lists appear only when the content is literally a list — ideas, links.)
- Over-polishing: upgrading his casual words, merging his short paragraphs, "fixing" sentence fragments that were doing their job.
- Inventing a neat anecdote, a fake metric, or a rounded-off moral.

## Calibration

**Dictated:** "the side-by-side thing was a big unlock for us because it just allowed everyone to have a much clearer sense of what was happening right from their browser"
**Wrong:** "Ultimately, the side-by-side format proved transformative, giving stakeholders unprecedented clarity directly in the browser."
**Nick:** "The side-by-side thing was a big unlock for us. It gave everyone a much clearer sense of what was happening, right from their browser."

**Wrong:** "This raises fascinating questions about the future of design tooling."
**Nick:** "There are lots of questions here that don't have good answers."

**Wrong opener:** "Prototyping has always been central to the design process."
**Nick opener:** "I had a project recently where I needed to share multiple iterations of a flow with a client."

## Output format

For posts going into the site (`app/writing/articles.ts`): HTML string of `<p>` paragraphs; media as `<figure><img …/></figure>` or `<figure><video …></video></figure>`; links inline as `<a href="…" target="_blank" rel="noopener noreferrer">`; date style "Nov 2026"; slug lowercase-hyphenated. Otherwise plain markdown prose. Flag any typo-level corrections you made to his supplied text so he can see them.
