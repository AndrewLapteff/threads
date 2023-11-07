'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import * as z from 'zod'
import { onboardingSchema } from '@/lib/validation/onboardingSchema'
import { Textarea } from '../ui/textarea'

import { ThreadSchema, threadSchema } from '@/lib/validation/threadSchema'

const PostThread = ({ userId }: { userId: string }) => {
  const form = useForm<ThreadSchema>({
    resolver: zodResolver(threadSchema),
  })

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormControl className="resize-none bg-dark-2 border-dark-1 text-light-1 outline-0">
                <Textarea rows={15} placeholder="Message" {...field} />
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

export default PostThread
