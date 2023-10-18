'use client'

import { useEffect, useState } from 'react'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RegisterSchema, registerSchema } from '@/app/validation/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import Providers from './Providers'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })

  useEffect(() => {
    setFocus('email')
  }, [])

  const submitHandler: SubmitHandler<RegisterSchema> = async (userInfo) => {
    const { username, email, password } = userInfo
    if (!username || !email || !password) {
      setError('All fields require')
      return
    }
    try {
      const checkRes = await fetch('api/user-exists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const { user } = await checkRes.json()
      if (user) {
        setError('This email is already taken')
        return
      }
    } catch (error) {
      setError('An error occured while registration')
      return
    }
    try {
      // const res = await fetch('api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, email, password }),
      // })
      // if (!res.ok) setError('An error during registration')
      const res = await signIn('credentials', {
        username,
        email,
        password,
        redirect: false,
      })

      setUsername('')
      setEmail('')
      setPassword('')
      router.push('/sign-in')
    } catch (error) {
      console.log('An error while posting data to server')
    }
  }

  const googleAuth = () => {
    signIn('google', { callbackUrl: 'http://localhost:3000/' })
  }

  return (
    <Providers>
      <div className="w-full p-6 m-auto bg-dark-2 rounded-md shadow-md lg:max-w-xl">
        <h1 className="font-semibold text-center text-white">Sign up</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Username
            </label>
            <input
              {...register('username')}
              id="username"
              type="text"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white ring rounded-md focus:border-purple-400 focus:ring-purple-300 ${
                errors.email && 'ring-red-600'
              } focus:outline-none focus:ring-opacity-40`}
            />
            {errors.username ? (
              <span role="alert" className="text-red-500">
                {errors.username?.message}
              </span>
            ) : (
              <div> </div>
            )}
          </div>
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
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6"></div>
          <div className="flex items-center relative">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 bg-gray-50 accent-primary-500 focus:outline-2 focus:outline-primary-500 outline-none"
            />
            <label
              htmlFor="terms"
              className="font-light text-gray-500 text-sm ml-3 cursor-pointer select-none"
            >
              I accept{' '}
              <a
                className="font-medium text-primary-500 hover:text-primary-700 focus:text-primary-700 transition-colors outline-none"
                href="#"
              >
                the Terns of use
              </a>
            </label>
          </div>
          <p className="text-white text-center">{error}</p>
          <div className="mt-6">
            <button
              aria-label="Register"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex mt-4 gap-x-2">
          <button
            onClick={googleAuth}
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-white"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-white"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button>
          <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-white"
            >
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
            </svg>
          </button>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          <Link
            href="sign-in"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Providers>
  )
}

export default RegisterForm
