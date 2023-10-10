'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/app/validation/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import * as z from 'zod'
import {
  OnboardingSchema,
  onboardingSchema,
} from '@/app/validation/onboardingSchema'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'

const OnboardingForm = () => {
  const [error, setError] = useState('')

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
    },
  })

  const router = useRouter()
  function onSubmit(values: z.infer<typeof onboardingSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel
                className="account-form_image-label"
                style={{ color: 'white', cursor: 'pointer' }}
              >
                {field.value ? (
                  <Image
                    width={30}
                    height={30}
                    src="/assets/check.svg" // field.value
                    alt="profile picture"
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    width={24}
                    height={24}
                    src="/assets/profile.svg"
                    alt="profile picture"
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input className="hidden" type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel style={{ color: 'white' }}>Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel style={{ color: 'white' }}>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="John"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-purple-700 hover:bg-purple-900" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default OnboardingForm
