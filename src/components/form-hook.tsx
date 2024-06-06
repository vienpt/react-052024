import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import { CalendarIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils.ts'
import { Calendar } from '@/components/ui/calendar.tsx'
import { format, formatISO } from 'date-fns'
import { useEffect } from 'react'

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
})
type FormHookProps = z.infer<typeof formSchema>

export default function FormHook() {
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
                <Popover>
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

          <div className="flex-1 text-center">
            <Button type="submit" className="w-[200px]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
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
