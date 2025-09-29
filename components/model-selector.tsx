'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Check, ChevronsUpDown } from 'lucide-react'

import { Model } from '@/lib/types/models'
import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'

import { createModelId } from '../lib/utils'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function groupModelsByProvider(models: Model[]) {
  return models
    .filter(model => model.enabled)
    .reduce(
      (groups, model) => {
        const provider = model.provider
        if (!groups[provider]) {
          groups[provider] = []
        }
        groups[provider].push(model)
        return groups
      },
      {} as Record<string, Model[]>
    )
}

interface ModelSelectorProps {
  models: Model[]
}

export function ModelSelector({ models }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(() => {
    const savedModel = getCookie('selectedModel')
    if (savedModel) {
      try {
        const model = JSON.parse(savedModel) as Model
        return createModelId(model)
      } catch (e) {
        return ''
      }
    }
    return ''
  })

  const selectedModel = models.find(model => createModelId(model) === value)
  const groupedModels = groupModelsByProvider(models)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          {selectedModel ? (
            <div className="flex items-center gap-2">
              <Image
                src={`/providers/logos/${selectedModel.providerId}.svg`}
                alt={selectedModel.provider}
                width={16}
                height={16}
                className="rounded-full border bg-white"
              />
              <span className="truncate text-sm">{selectedModel.name}</span>
            </div>
          ) : (
            "Select model"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            {Object.entries(groupedModels).map(([provider, providerModels]) => (
              <CommandGroup key={provider} heading={provider}>
                {providerModels.map(model => {
                  const modelId = createModelId(model)
                  return (
                    <CommandItem
                      key={modelId}
                      value={modelId}
                      onSelect={(currentValue) => {
                        const newValue = currentValue === value ? '' : currentValue
                        setValue(newValue)
                        
                        const selectedModel = models.find(
                          model => createModelId(model) === newValue
                        )
                        if (selectedModel) {
                          setCookie('selectedModel', JSON.stringify(selectedModel))
                        } else {
                          setCookie('selectedModel', '')
                        }
                        
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === modelId ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <Image
                        src={`/providers/logos/${model.providerId}.svg`}
                        alt={model.provider}
                        width={16}
                        height={16}
                        className="mr-2 rounded-full border bg-white"
                      />
                      <span className="text-sm">{model.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
