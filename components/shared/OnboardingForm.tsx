'use client'

import { ChangeEvent, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
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
} from '@/lib/validation/onboardingSchema'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { calculateImageSize, isImageBase64 } from '@/lib/utils'
import { updateUser } from '@/lib/actions/user.actions'
import { useUser } from '@clerk/nextjs'
import { MAX_FILE_SIZE } from '@/constants'
import { useUploadThing } from '@/lib/uploadthing'

const OnboardingForm = () => {
  const { user } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const [files, setFile] = useState<File[]>([])
  const [imgError, setImgError] = useState('')

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
  })

  const { startUpload } = useUploadThing('media')

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    if (!(values.bio || values.name || values.image)) return
    const isImage = isImageBase64(values.image)
    let isTheSizeRight
    if (isImage)
      isTheSizeRight = calculateImageSize(values.image) < MAX_FILE_SIZE

    if (!user) return

    if (isImage) {
      if (isTheSizeRight) {
        const imgRes = await startUpload(files)
        if (imgRes && imgRes[0].url) values.image = imgRes[0].url
      } else {
        setImgError('The size of image is too heavy')
      }
    } else {
      setImgError('This format of image is not allowed')
    }

    try {
      updateUser({
        bio: values.bio ? values.bio : null,
        name: values.name ? values.name : null,
        image: values.image,
        userId: user.id,
        username: user.fullName as string,
        path: pathname,
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const fileHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    const fileReader = new FileReader()

    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0]

      setFile(Array.from(e.target.files))

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
              field.value = user?.imageUrl === null ? '' : user?.imageUrl
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
              field.value = user?.fullName === null ? '' : user?.fullName!
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

export default OnboardingForm
