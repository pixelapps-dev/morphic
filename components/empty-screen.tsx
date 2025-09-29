import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const exampleMessages = [
  {
    heading: 'Explain quantum computing',
    message: 'Explain quantum computing in simple terms',
    icon: '🔬'
  },
  {
    heading: 'Analyze market trends',
    message: 'What are the current AI market trends?',
    icon: '📈'
  },
  {
    heading: 'Write creative content',
    message: 'Write a short story about space exploration',
    icon: '✨'
  },
  {
    heading: 'Code assistance',
    message: 'Help me debug this React component',
    icon: '💻'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all duration-300 ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 grid grid-cols-2 gap-3 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 text-left border-border/50 hover:border-border hover:bg-accent/30 transition-all duration-200 group rounded-xl"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <div className="flex items-start gap-3 w-full">
                <span className="text-xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {message.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground group-hover:text-foreground transition-colors">
                    {message.heading}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
