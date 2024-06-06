import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar.tsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format, formatISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }).trim(),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .trim()
    .max(8, {
      message: 'Password have maximum 8 characters',
    })
    .trim(),
  userName: z
    .string()
    .min(1, { message: 'userName is required' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .trim(),
  office: z.object({
    name: z
      .string()
      .min(5, {
        message: 'Office name must be at least 5 characters',
      })
      .trim(),
    city: z.string().min(1, {
      message: 'Please select your current city',
    }),
    // city: z.string().optional()
    dob: z.date({
      required_error: 'Please select a date and time',
    }),
  }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
})
type FormHookProps = z.infer<typeof formSchema>

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

export default function FormHook() {
  const [open, setOpen] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const { toast } = useToast()
  const form = useForm<FormHookProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      office: {
        name: '',
        city: '',
      },
      // language: '',
    },
  })

  // const watchOfficeDob = form.watch('office.dob', undefined)

  function onSubmit(values: FormHookProps) {
    const newValues = {
      ...values,
      dob: formatISO(values.office.dob, { format: 'basic' }),
    }
    console.log('newValue', newValues)

    form.reset()

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(newValues, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  useEffect(() => {
    form.reset()
  }, [form.reset])

  // useEffect(() => {
  //   console.log('watchOfficeDob', watchOfficeDob)
  // }, [watchOfficeDob])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 justify-center"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabelValidate
                  label="Username"
                  htmlFor="userName"
                  invalid={fieldState.invalid}
                />
                <FormControl>
                  <Input placeholder="your name" {...field} />
                </FormControl>
                <FormMessageValidate />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={fieldState.invalid ? 'text-red-500' : ''}
                  htmlFor="email"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessageValidate />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabelValidate
                  label="Password"
                  htmlFor="password"
                  invalid={fieldState.invalid}
                />
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    autoComplete="on"
                    {...field}
                  />
                </FormControl>
                <FormMessageValidate />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="office.name"
            render={({ field, fieldState }) => (
              <FormItem id="office-name">
                <FormLabelValidate
                  label="Office name"
                  htmlFor="office.name"
                  invalid={fieldState.invalid}
                />
                <FormControl>
                  <Input placeholder="office name" {...field} />
                </FormControl>
                <FormMessageValidate />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="office.city"
            render={({ field, fieldState }) => (
              <FormItem id="office-city">
                <FormLabelValidate
                  label="Office city"
                  htmlFor="office.city"
                  invalid={fieldState.invalid}
                />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the city to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="HoChiMinh">Ho Chi Minh</SelectItem>
                    <SelectItem value="Berlin">Berlin</SelectItem>
                    <SelectItem value="Manchester">Manchester</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessageValidate />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="office.dob"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabelValidate
                  label="Date of birth"
                  htmlFor="office.dob"
                  invalid={fieldState.invalid}
                />
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal bg-white hover:bg-transparent',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      onDayClick={() => setOpenCalendar(false)}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessageValidate />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabelValidate
                  label={'Language'}
                  htmlFor="language"
                  invalid={fieldState.invalid}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value,
                            )?.label
                          : 'Select language'}
                        <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search language..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.clearErrors('language')
                                form.setValue('language', language.value)
                                setOpen(false)
                              }}
                            >
                              {language.label}
                              <CheckIcon
                                className={cn(
                                  'ml-auto size-4',
                                  language.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessageValidate />
              </FormItem>
            )}
          />

          <div className="flex-1 text-center">
            <Button type="submit" className="w-[200px]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex-1 text-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up ',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              // action: (
              //   <ToastAction altText="Goto schedule to undo">
              //     Undo
              //   </ToastAction>
              // ),
            })
          }}
        >
          Add to calendar
        </Button>
      </div>
    </>
  )
}

function FormLabelValidate({
  label,
  invalid,
  htmlFor,
}: {
  label: string
  invalid?: boolean
  htmlFor?: string
}) {
  return (
    <FormLabel htmlFor={htmlFor} className={invalid ? 'text-red-500' : ''}>
      {label}
    </FormLabel>
  )
}

function FormMessageValidate() {
  return <FormMessage className="text-red-500" />
}
