'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { LoginSchema, loginSchema } from '@/app/validation/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
import { UserType } from '@/app/types/User'

const LoginForm = () => {
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

  useEffect(() => {
    setFocus('email')
  }, [])

  const router = useRouter()

  const submitHandler: SubmitHandler<LoginSchema> = async (userInfo) => {
    setError('')
    axios
      .post<ApiResponse<UserType>>('/api/login', userInfo)
      .then((res) => {
        router.push('/')
      })
      .catch((error) => {
        const err = error as AxiosError<ApiResponse<UserType>>
        setError(err.response?.data.error as string)
      })
  }

  return (
    <div className="w-full p-6 m-auto bg-dark-2 rounded-md shadow-md lg:max-w-xl">
      <h1 className="font-semibold text-center text-white">Sign in</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="mt-6">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white"
          >
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white ring rounded-md focus:border-purple-400 focus:ring-purple-300 ${
              errors.email && 'ring-red-600'
            } focus:outline-none focus:ring-opacity-40`}
          />
          {errors.email ? (
            <span role="alert" className="text-red-500">
              {errors.email?.message}
            </span>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="mb-2">
          <label
            form="password"
            className="block text-sm font-semibold text-white"
          >
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            aria-invalid={errors.password ? 'true' : 'false'}
            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white ring rounded-md focus:border-purple-400 focus:ring-purple-300 ${
              errors.password && 'ring-red-600'
            } focus:outline-none focus:ring-opacity-40`}
          />
          {errors.password ? (
            <span role="alert" className="text-red-500">
              {errors.password?.message}
            </span>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="mb-2">
          <label
            form="password"
            className="block text-sm font-semibold text-white"
          >
            Confirm the password
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white ring rounded-md focus:border-purple-400 focus:ring-purple-300 ${
              errors.confirmPassword && 'ring-red-600'
            } focus:outline-none focus:ring-opacity-40`}
          />
          {errors.confirmPassword ? (
            <span role="alert" className="text-red-500">
              {errors.confirmPassword?.message}
            </span>
          ) : (
            <div> </div>
          )}
        </div>
        <a href="#" className="text-xs text-purple-600 hover:underline">
          Forget Password?
        </a>
        <div className="mt-6">
          <button
            aria-label="Login"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 mb-4"
          >
            Login
          </button>
        </div>
      </form>
      {error ? (
        <p role="alert" className="text-red-500 text-center">
          {error}
        </p>
      ) : (
        <div> </div>
      )}
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        <Link
          href="/sign-up"
          className="font-medium text-purple-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
