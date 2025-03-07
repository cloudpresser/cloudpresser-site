import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const onSubmit = async (message: ContactMessage) => {
    try {
      // Build payload matching your Worker’s expected field names
      const payload = {
        name: message.name,
        email_address: message.email,
        phone: message.phone,            // optional
        message: message.message,          // optional
        extra_field: message.extraField,  // honeypot
        // turnstileToken,   // optional if you use Turnstile
      };

      const response = await fetch('https://form-handler.luiz-d96.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      // Success
      // setSuccess('Your form was submitted successfully!');
    } catch (error) {
      alert('Failed to submit form: ' + error);
    }
  }
  return (
    <>
      <Head>
        <title>{content.metadata.seo.homePageTitle}</title>
      </Head>
      <Header onSubmit={onSubmit} />
      {
        flags.services && (<Services
          title={content.sections.services.title}
          subtitle={content.sections.services.subtitle}
          serviceList={content.services as any}
        />)}
      {flags.portfolio && <Portfolio />}
      {flags.contact && <Contact
        title={content.sections.contact.title}
        onSubmit={onSubmit}
      />}
    </>
  )
}

const Services = (props: {
  title: string
  subtitle: string
  serviceList: [{
    title: string
    description: string
    id: string
  }, {
    title: string
    description: string
    id: string
  }, {
    title: string
    description: string
    id: string
  }, {
    title: string
    description: string
    id: string
  }]
}) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  return (
    <section className="bg-white py-12 lg:py-20 overflow-hidden max-w-full">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 xl:px-16">
        <div className="max-w-xl mx-auto text-center mb-24">
          <h2
            id='services'
            className="text-center mb-5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-300"
          >
            {props.title}
          </h2>
          <p className="text-center text-gray-900 text-base">
            {props.subtitle}
          </p>
        </div>

        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <a href={`/services/${props.serviceList[0].id}`} className="transition-all ease-in-out delay-150 relative hover:-translate-y-5 group z-10">
            <div
              className="transition-all ease-in-out delay-150 text-2xl group-hover:text-3xl flex leading-3 items-center justify-center font-bold text-white w-16 group-hover:w-24 h-16 group-hover:h-24 rounded-full round-solid group-hover:round-gradient absolute -left-5 group-hover:-left-6 -top-5 group-hover:-top-10 z-20"
            >
              1
            </div>

            <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-0">
              <Image
                height={20}
                width={20}
                src="/icons/setting.png"
                className="w-16 object-contain"
                alt=""
              />
            </div>

            <div
              className="transition-all ease-in-out delay-150 pt-16 pb-6 px-5 rounded-2xl border border-gray-100 shadow-md group-hover:shadow-primary w-full h-full relative z-10 bg-white"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3">
                {props.serviceList[0].title}
              </h2>
              <p className="text-gray-500 text-base">
                {props.serviceList[0].description}
              </p>
            </div>
          </a>
          <a href={`/services/${props.serviceList[1].id}`} className="transition-all ease-in-out delay-150 relative hover:-translate-y-5 group z-20">
            <div
              className="transition-all ease-in-out delay-150 text-2xl group-hover:text-3xl flex leading-3 items-center justify-center font-bold text-white w-16 group-hover:w-24 h-16 group-hover:h-24 rounded-full round-solid group-hover:round-gradient absolute -left-5 group-hover:-left-6 -top-5 group-hover:-top-10 z-20"
            >
              2
            </div>

            <div className="absolute -top-8 right-16 z-0">
              <Image
                height={20}
                width={20}
                src="/icons/setting.png"
                className="w-16 object-contain"
                alt=""
              />
            </div>

            <div
              className="transition-all ease-in-out delay-150 pt-16 pb-6 px-5 rounded-2xl border border-gray-100 shadow-md group-hover:shadow-primary w-full h-full relative z-10 bg-white"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3">
                {props.serviceList[1].title}
              </h2>
              <p className="text-gray-500 text-base">
                {props.serviceList[1].description}
              </p>
            </div>
          </a>
          <a href={`/services/${props.serviceList[2].id}`} className="transition-all ease-in-out delay-150 relative hover:-translate-y-5 group z-30">
            <div
              className="transition-all ease-in-out delay-150 text-2xl group-hover:text-3xl flex leading-3 items-center justify-center font-bold text-white w-16 group-hover:w-24 h-16 group-hover:h-24 rounded-full round-solid group-hover:round-gradient absolute -left-5 group-hover:-left-6 -top-5 group-hover:-top-10 z-20"
            >
              3
            </div>

            <div className="absolute -right-10 bottom-8 z-0">
              <Image
                height={50}
                width={50}
                src="/icons/setting-2.png"
                className="w-20 object-contain"
                alt=""
              />
            </div>

            <div
              className="transition-all ease-in-out delay-150 pt-16 pb-6 px-5 rounded-2xl border border-gray-100 shadow-md group-hover:shadow-primary w-full h-full relative z-10 bg-white"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3">
                {props.serviceList[2].title}
              </h2>
              <p className="text-gray-500 text-base">
                {props.serviceList[2].description}
              </p>
            </div>
          </a>
          <a href={`/services/${props.serviceList[3].id}`} className="transition-all ease-in-out delay-150 relative hover:-translate-y-5 group z-40">
            <div
              className="transition-all ease-in-out delay-150 text-2xl group-hover:text-3xl flex leading-3 items-center justify-center font-bold text-white w-16 group-hover:w-24 h-16 group-hover:h-24 rounded-full round-solid group-hover:round-gradient absolute -left-5 group-hover:-left-6 -top-5 group-hover:-top-10 z-20"
            >
              4
            </div>

            <div className="absolute -right-8 -bottom-20 z-0">
              <Image
                height={50}
                width={50}
                src="/icons/setting-2.png"
                className="w-28 object-contain"
                alt=""
              />
            </div>

            <div className="absolute -right-16 -bottom-2 z-0">
              <Image
                height={50}
                width={50}
                src="/icons/setting.png"
                className="w-20 object-contain"
                alt=""
              />
            </div>

            <div
              className="transition-all ease-in-out delay-150 pt-16 pb-6 px-5 rounded-2xl border border-gray-100 shadow-md group-hover:shadow-primary w-full h-full relative z-10 bg-white"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
                {props.serviceList[3].title}
              </h2>
              <p className="text-gray-500 text-base">
                {props.serviceList[3].description}
              </p>
            </div>
          </a>
        </div>
      </div>
      {showSuccessToast && (
        <Toast
          message="Message sent successfully! We'll be in contact soon."
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </section>
  )
}

const Portfolio = (props: any) => {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 xl:px-16">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2
            className="text-center mb-5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-300"
          >
            Our Portfolio
          </h2>
          <p className="text-center text-gray-900 text-base">
            Explore our featured projects showcasing our expertise in mobile app development,
            web applications, and digital solutions that drive business growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <a href='https://www.vectorvest.com' className="lg:col-span-5 transition-all ease-in-out delay-150 shadow-lg hover:shadow-primary hover:-translate-y-3 rounded-xl overflow-hidden h-full z-10 bg-white">
            <div className="relative h-[400px]">
              <Image
                src="/vectorvest.png"
                fill
                className="object-contain p-4"
                quality={90}
                alt="VectorVest Mobile App Screenshot"
              />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-5">VectorVest Mobile App</h3>
              <p className="text-gray-600">
                Welcome to the VectorVest Stock Advisory app. It puts all the information you need to make faster, smarter, better investing decisions at your fingertips.
                VectorVest is the only service that analyzes, sorts and ranks over 8,000 stocks every day for Value, Safety and Timing. It tells you when to buy, what to buy and when to sell. And, it is the only service that combines the power of fundamental valuation with the insight of technical analysis. VectorVest provides answers, not just data, for you to analyze on your own. We do the work. You reap the profits.
              </p>
            </div>
          </a>
          <div className="flex flex-col space-y-8 lg:col-span-7">
            <a
              href='https://apps.apple.com/us/app/finequities/id1564158426'
              className="transition-all ease-in-out delay-150 shadow-lg hover:shadow-primary hover:-translate-y-3 rounded-xl flex flex-col border border-gray-100 overflow-hidden z-20 bg-white"
            >
              <div className="relative h-[200px]">
                <Image
                  src="/finequities.png"
                  fill
                  className="object-contain p-4"
                  quality={90}
                  alt="Finequities Mobile App Screenshot"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-5">Finequities Mobile App</h3>
                <p className="text-gray-600">
                  Finequities is a social investing platform that combines the power of artificial intelligence (AI) with social networking features. It allows users to connect with a community of investors, access investment insights, and make informed investment decisions.
                </p>
              </div>
            </a>
            <a
              href='https://borroup.com'
              className="transition-all ease-in-out delay-150 shadow-lg hover:shadow-primary hover:-translate-y-3 rounded-xl flex flex-col border border-gray-100 overflow-hidden z-20 bg-white"
            >
              <div className="relative h-[200px]">
                <Image
                  src="/borroup.png"
                  fill
                  className="object-contain p-4"
                  quality={90}
                  alt="BorroUp App Screenshot"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-5">BorroUp</h3>
                <p className="text-gray-600">
                  Welcome to BorroUp, the ultimate peer-to-peer mobile platform for renting adventure gear. Whether you're an outdoor enthusiast looking to save on gear for your next adventure or someone with unused equipment, BorroUp has got you covered. Our mission is to create a sustainable community where everyone can enjoy the great outdoors without the financial burden of purchasing expensive gear.
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        {/*   <div className="transition-all ease-in-out delay-150 shadow-md hover:shadow-primary hover:-translate-y-3 rounded-xl overflow-hidden h-full z-40"> */}
        {/*     <div className="aspect-video"> */}
        {/*       <Image */}
        {/*         height={50} */}
        {/*         width={50} */}
        {/*         src="/portfolio/portfolio-4.png" */}
        {/*         className="w-full h-full object-cover object-center" */}
        {/*         alt="" */}
        {/*       /> */}
        {/*     </div> */}
        {/*     <div className="p-5"> */}
        {/*       <h3 className="text-2xl font-semibold mb-5">Project 4</h3> */}
        {/*       <p className="text-gray-600"> */}
        {/*         Sed lacinia faucibus sed quam sem tellus id suspendisse rhoncus. */}
        {/*         Placerat pretium. */}
        {/*       </p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/*   <div className="transition-all ease-in-out delay-150 shadow-md hover:shadow-primary hover:-translate-y-3 rounded-xl overflow-hidden h-full z-50"> */}
        {/*     <div className="aspect-video"> */}
        {/*       <Image */}
        {/*         height={50} */}
        {/*         width={50} */}
        {/*         src="/portfolio/portfolio-5.png" */}
        {/*         className="w-full h-full object-cover object-center" */}
        {/*         alt="" */}
        {/*       /> */}
        {/*     </div> */}
        {/*     <div className="p-5"> */}
        {/*       <h3 className="text-2xl font-semibold mb-5">Project 5</h3> */}
        {/*       <p className="text-gray-600"> */}
        {/*         Sed lacinia faucibus sed quam sem tellus id suspendisse rhoncus. */}
        {/*         Placerat pretium. */}
        {/*       </p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/*   <div className="transition-all ease-in-out delay-150 shadow-md hover:shadow-primary hover:-translate-y-3 rounded-xl overflow-hidden h-full z-60"> */}
        {/*     <div className="aspect-video"> */}
        {/*       <Image */}
        {/*         height={50} */}
        {/*         width={50} */}
        {/*         src="/portfolio/portfolio-6.png" */}
        {/*         className="w-full h-full object-cover object-center" */}
        {/*         alt="" */}
        {/*       /> */}
        {/*     </div> */}
        {/*     <div className="p-5"> */}
        {/*       <h3 className="text-2xl font-semibold mb-5">Project 6</h3> */}
        {/*       <p className="text-gray-600"> */}
        {/*         Sed lacinia faucibus sed quam sem tellus id suspendisse rhoncus. */}
        {/*         Placerat pretium. */}
        {/*       </p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </section>
  )
}

const Header = (props: { onSubmit: (message: ContactMessage) => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [extraField, setExtraField] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const validateEmailRegex = (value: string): boolean => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  }

  const handleHeaderSubmit = async () => {
    setErrors([])

    const contactMessage: ContactMessage = {
      name,
      email,
      phone: '',
      message: '',
      extraField
    }

    let errors: ValidationError[] = []

    if (contactMessage.name === '') {
      errors.push({ type: 'name', message: 'Name is required' })
    }

    if (contactMessage.email === '') {
      errors.push({ type: 'email', message: 'Email is required' })
    }

    if (!validateEmailRegex(email)) {
      errors.push({ type: 'email', message: 'Email is invalid' })
    }

    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    // Submit the message using the same handler as Contact form
    try {
      await props.onSubmit(contactMessage)
      setShowSuccessToast(true)
      setName('')
      setEmail('')
      setExtraField('')
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }

  return (
    <header className="relative flex flex-col min-h-screen h-full">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          height={500}
          width={500}
          src="/backgroung.png"
          className="w-full h-full object-cover object-left"
          alt=""
        />
      </div>
      <NavBar theme='light' />
      <div
        className="flex-1 relative z-10 mx-auto max-w-screen-2xl px-5 sm:px-10 xl:px-16 md:flex justify-between items-center w-full py-12"
      >
        <div className="md:max-w-lg">
          <h1
            className="text-primary-400 text-2xl sm:text-3xl xl:text-4xl font-semibold text-center md:text-left"
          >
            {content.header.title}
          </h1>
          <p className="text-sm mt-6 text-gray-800 text-center md:text-left">
            {content.header.description}
          </p>
          <div
            className="mt-4 flex flex-row md:flex-col md:space-y-3 space-x-3 md:space-x-0 justify-center md:justify-start md:items-start"
          >
            {flags.calendar && <a href="#" className="primary-button truncate">Schedule Now</a>}
            {flags.contact && <a href="#contact" className="bg-primary-400 text-gray-200 secondary-button truncate transition hover:text-primary-400 hover:bg-gray-200">{content.header.buttonText}</a>}
          </div>
        </div>

        <div className="w-full mt-6 md:mt-0 flex flex-col items-center gap-8 md:pl-6">
          <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:ml-6 max-w-lg">
            <Image
              width={300}
              height={200}
              src="/hero-image.png"
              sizes="(max-width: 768px) 90vw, 33vw"
              quality={50}
              priority
              className="w-full h-auto object-contain max-h-[300px] mb-6"
              alt="Hero illustration"
            />
            <h1 className="text-xl font-semibold mb-4 text-primary-400">{content.header.getStartedText}</h1>
            <form className="space-y-4">
              <div>
                <label htmlFor="hero-name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="hero-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter your name"
                />
                {errors.find(e => e.type === 'name') && <ErrorText>{errors.find(e => e.type === 'name')?.message}</ErrorText>}
              </div>
              <div>
                <label htmlFor="hero-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="hero-email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="you@example.com"
                />
                {errors.find(e => e.type === 'email') && <ErrorText>{errors.find(e => e.type === 'email')?.message}</ErrorText>}
              </div>
              <input
                type="text"
                id="extra_message"
                value={extraField}
                onChange={(e) => setExtraField(e.target.value)}
                style={{ display: 'none' }}
              />
              <button
                type="submit"
                className="w-full primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleHeaderSubmit();
                }}
              >
                {content.header.getStartedButtonText}
              </button>
            </form>
          </div>
        </div>
      </div>
      {showSuccessToast && (
        <Toast
          message="Message sent successfully!"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </header>
  )
}
export const NavBar = (props: { theme: 'dark' | 'light' }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const fontStyles = {
    dark: "text-gray-800 hover:text-gray-600",
    light: "text-white hover:text-gray-100",
  }
  return (
    <nav className="bg-transparent" x-data="{mobileNav: false}">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 xl:px-16">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <a href="/" className="flex flex-shrink-0 items-center">
              <Image
                height={66}
                width={131}
                className="block h-8 w-auto lg:hidden"
                src="/logo.png"
                alt="Cloudpresser LLC logo"
              />
              <Image
                height={66}
                width={131}
                className="hidden h-14 w-auto lg:block"
                src="/logo.png"
                alt="Cloudpresser LLC logo"
              />
            </a>
          </div>
          <div className="flex flex-1" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-black lg:hidden"
              onClick={() => setNavbarOpen(!navbarOpen)}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${navbarOpen ? "hidden" : "visible"}`}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden={navbarOpen}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${navbarOpen ? "visible" : 'hidden'}`}

                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden={!navbarOpen}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="hidden sm:ml-6 lg:block">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className={`${fontStyles[props.theme]} font-semibold transition px-3 py-2 text-sm`}
                >Home
                </a>
                <a
                  href="/#services"
                  className={`${fontStyles[props.theme]} font-semibold transition px-3 py-2 text-sm`}
                >Services
                </a>
                {flags.calendar && <a
                  href="./calender.html"
                  className={`${fontStyles[props.theme]} font-semibold transition px-3 py-2 text-sm`}
                >Calendar</a>}
                {flags.price && <a
                  href="./pricing.html"
                  className={`${fontStyles[props.theme]} font-semibold transition px-3 py-2 text-sm`}
                >Price</a>}
                {flags.blog && <a
                  href="./blog.html"
                  className={`${fontStyles[props.theme]} font-semibold transition px-3 py-2 text-sm`}
                >Blog</a>}
                {flags.contact && <a
                  href="/#contact"
                  className={`${fontStyles[props.theme]} font-semibold transition px-3 py-2 text-sm`}
                >Contact</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden relative z-10 ${navbarOpen ? "visible" : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="/"
            className="bg-primary-400 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >Home</a>
          <a
            href="/#services"
            className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >Services</a>
          {flags.calendar && <a
            href="#"
            className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Calendar</a>}
          {flags.price && <a
            href="#"
            className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Price</a>}
          {flags.blog && <a
            href="#"
            className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Blog</a>}
          {flags.contact && <a
            href="#"
            className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Contact</a>}
        </div>
      </div>
    </nav>
  )
}

interface ContactMessage {
  name: string
  email: string
  phone: string
  message: string,
  extraField: string
}
import { useState, useEffect } from 'react'
import { flags } from '@/util/flags'
import { content } from '@/data/content'
import Head from 'next/head'

type ValidationError = { type: 'phone' | 'email' | 'name' | 'message', message: string }
export const Contact = (props: { title: string, onSubmit: (message: ContactMessage) => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // Honeypot field (usually hidden in the DOM)
  const [extraField, setExtraField] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const [errors, setErrors] = useState<ValidationError[]>([])

  const handleSubmit = async () => {
    setErrors([])

    const contactMessage: ContactMessage = {
      name,
      email,
      phone,
      message,
      extraField
    }

    /**
     * Validate and display errors
     */
    let errors: ValidationError[] = []

    if (contactMessage.name === '') {
      errors.push({ type: 'name', message: 'Name is required' })
    }

    if (contactMessage.email === '') {
      errors.push({ type: 'email', message: 'Email is required' })
    }

    if (contactMessage.phone === '') {
      errors.push({ type: 'phone', message: 'Phone is required' })
    }

    if (contactMessage.message === '') {
      errors.push({ type: 'message', message: 'Message is required' })
    }

    if (!validateEmailRegex(email)) {
      errors.push({ type: 'email', message: 'Email is invalid' })
    }

    if (!validateNormalizedPhone(contactMessage.phone)) {
      errors.push({ type: 'phone', message: 'Phone is invalid' })
    }

    if (contactMessage.message.length < 10) {
      errors.push({ type: 'message', message: 'Message is too short' })
    }

    if (!props.onSubmit) {
      alert('No submit handler, message: ' + JSON.stringify(contactMessage))
      return
    }

    if (errors.length > 0) {
      setErrors(errors)
      return
    }
    // Submit the message
    try {
      await props.onSubmit(contactMessage)
      setShowSuccessToast(true)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setExtraField('')
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }

  const validateEmailRegex = (value: string): boolean => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  }

  const validateNormalizedPhone = (value: string): boolean => {
    const numbers = value.replace(/\D/g, '')
    return numbers.length === 10
  }

  const normalizeInput = (value: string, previousValue: string): string => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return currentValue;

      // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

      // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }

    return ''
  };

  return (
    <section className="py-12" id="contact">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 xl:px-16">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2
            className="text-center mb-5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-300"
          >
            {props.title}
          </h2>
          <div className="text-center text-gray-900">
            <div className="font-medium">
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {content.sections.contact.subtitle.contactInfo.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {content.sections.contact.subtitle.contactInfo.phone}
              </p>
            </div>
            <p className="text-base mt-4">{content.sections.contact.subtitle.outro}</p>
          </div>
        </div>

        <div className="mt-2 grid md:grid-cols-2 gap-5 md:gap-0">
          <div className="">
            <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >Full name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name="name"
                    placeholder='John Doe'
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition"
                  />
                  {errors.find(e => e.type === 'name') && <ErrorText>{errors.find(e => e.type === 'name')?.message}</ErrorText>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >Email Address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    placeholder="your@email.com"
                    onChange={e => setEmail(e.target.value)}
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition"
                  />
                  {errors.find(e => e.type === 'email') && <ErrorText>{errors.find(e => e.type === 'email')?.message}</ErrorText>}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >Phone Number</label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder='(123) 456-7890'
                    value={phone}
                    onChange={e => setPhone(normalizeInput(e.target.value, phone))}
                    name='phone'
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition"
                  />
                  {errors.find(e => e.type === 'phone') && <ErrorText>{errors.find(e => e.type === 'phone')?.message}</ErrorText>}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >Message</label>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder='Your message here...'
                    name='message'
                    id="message"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition"
                  ></textarea>
                  {errors.find(e => e.type === 'message') && <ErrorText>{errors.find(e => e.type === 'message')?.message}</ErrorText>}
                </div>
              </div>
              <input
                type="text"
                id="extra_message"
                value={extraField}
                style={{ display: 'none' }}
                onChange={(e) => setExtraField(e.target.value)}
              />

              <div className="col-span-full">
                <button className="primary-button px-20" type="submit" onClick={e => {
                  e.preventDefault()
                  handleSubmit()
                }}>Send</button>
              </div>
            </form>
          </div>
          <div className="h-full flex-shrink-0 flex flex-col justify-end">

            <Image
              height={200}
              width={300}
              src="/contact-image.png" className="w-full" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}


const Toast = ({ message, type = 'success', onClose }: { message: string, type?: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 rounded-lg shadow-lg`}>
        <div className="flex items-center space-x-3">
          {type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

const ErrorText = (props: { children?: string }) => {
  return (
    <p className="text-red-500 text-xs italic mt-1">{props.children}</p>
  )
}

export const Footer = (props: { callToAction?: string, phoneNumber: string, address: string, email: string }) => {
  return (
    <footer className="py-8 mt-12 footer-shadow">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 xl:px-16">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 items-center justify-between">
          <a href="/" className="flex flex-shrink-0 items-center">
            <Image
              height={100}
              width={100}
              className="h-14 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
          </a>

          <div className="text-primary-300 text-center text-xl sm:text-2xl lg:text-3xl font-semibold">
            {props.callToAction ?? "Let's work together"}
          </div>
          <div>
            <div className="flex items-center space-x-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
              </svg>

              <div>
                {props.phoneNumber}
              </div>

            </div>
            <div className="flex items-center space-x-3 text-gray-500 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>


              <div>
                {props.address}
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-500 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <div>
                {props.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
