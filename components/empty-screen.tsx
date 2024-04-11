import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
  heading: "Metallica's songwriting process",
  message: "How has Metallica's songwriting process evolved over the years, from their early days to their more recent albums? What roles do James Hetfield, Lars Ulrich, and the other band members typically play in crafting the music and lyrics?"
  },
  {
  heading: "Cliff Burton's influence on Metallica",
  message: "How did Cliff Burton's playing style and musical contributions shape Metallica's sound during his tenure with the band, and how has his legacy continued to influence the band even after his tragic death?"
  },
  {
  heading: "Metallica's most iconic live moments",
  message: "What are some of Metallica's most unforgettable and iconic live moments from throughout their career, such as their 1991 MTV Icon performance with the San Francisco Symphony or their historic concerts in Russia?"
  },
  {
  heading: "The story behind Master of Puppets",
  message: "What is the story and inspiration behind Metallica's classic album 'Master of Puppets'? How did the band approach the songwriting and recording process for this landmark thrash metal release?"
  },
  {
  heading: "Metallica's rare and unreleased tracks",
  message: "What are some of Metallica's most sought-after rare and unreleased tracks that hardcore fans love to collect and trade? Are there any particularly noteworthy demos, alternate versions, or live recordings?"
  },
  {
  heading: "Metallica's most significant tours",
  message: "Throughout Metallica's career, which tours stand out as the most significant or memorable, and why? Consider factors like setlists, stage production, opening acts, and cultural impact."
  },
  {
  heading: "Metallica band member trivia",
  message: "What are some fascinating pieces of trivia or lesser-known facts about each of the individual members of Metallica? This could include their musical influences, side projects, or personal interests outside of the band."
  }
  ];
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
