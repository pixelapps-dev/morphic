import { Button } from '@/components/ui/button'

const exampleMessages = [
  {
    heading: 'Explain quantum computing',
    message: 'Explain quantum computing in simple terms'
  },
  {
    heading: 'Analyze market trends',
    message: 'What are the current AI market trends?'
  },
  {
    heading: 'Write creative content',
    message: 'Write a short story about space exploration'
  },
  {
    heading: 'Code assistance',
    message: 'Help me debug this React component'
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
    <div className={`mx-auto w-full transition-opacity ${className}`}>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {exampleMessages.map((message, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-3 text-left justify-start"
            name={message.message}
            onClick={() => submitMessage(message.message)}
          >
            <span className="truncate">{message.heading}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
