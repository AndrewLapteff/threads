import OnboardingForm from '@/components/shared/OnboardingForm'

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl w-full flex-col justify-start px-5 py-5 lg:px-10 lg:py-20">
      <section className=" bg-dark-2 rounded-3xl lg:p-10 p-5 w-full">
        <OnboardingForm />
      </section>
    </main>
  )
}
