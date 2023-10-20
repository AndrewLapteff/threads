'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
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
import axios from 'axios'
import { isImageBase64 } from '@/lib/utils'
import { SessionProvider, useSession } from 'next-auth/react'

const OnboardingFormComponent = () => {
  const { data } = useSession()

  const [error, setError] = useState('')

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
  })

  const router = useRouter()
  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    if (!(values.bio || values.name || values.image)) return

    if (!isImageBase64(values.image)) return

    try {
      const res = await axios.post('/api/onboarding', values)
      res.data
    } catch (error) {
      console.log('err')
    }
    console.log(values)
  }

  const fileHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    const fileReader = new FileReader()

    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0]

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const dataUrl = event.target?.result?.toString() || ''
        fieldChange(dataUrl)
      }
      fileReader.readAsDataURL(file)
    }
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
          render={({ field }) => {
            if (field.value === undefined)
              field.value = data?.user?.image === null ? '' : data?.user?.image
            return (
              <FormItem className="mb-5">
                <FormLabel
                  className="account-form_image-label"
                  style={{
                    color: 'white',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  {field.value ? (
                    <Image
                      width={100}
                      height={80}
                      src={field.value}
                      alt="profile picture"
                      className="rounded-full overflow-hidden object-contain"
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
                  <Input
                    className="hidden"
                    type="file"
                    onChange={(e) => fileHandler(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            if (field.value === undefined)
              field.value = data?.user?.name === null ? '' : data?.user?.name
            return (
              <FormItem className="mb-5">
                <FormLabel style={{ color: 'white' }}>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
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
                  placeholder="Bio"
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

const OnboardingForm = () => {
  return (
    <SessionProvider>
      <OnboardingFormComponent />
    </SessionProvider>
  )
}

export default OnboardingForm
