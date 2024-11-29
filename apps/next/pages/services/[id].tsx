import { useRouter } from "next/router";
import { Contact, Footer, NavBar } from "..";
import { flags } from "@/util/flags";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { services } from "@/data/services";
import remarkGfm from "remark-gfm";
import Head from "next/head";
import { get } from "http";
import Image from "next/image";

export default function Service() {
  const router = useRouter();
  const { id } = router.query;
  const service = services.find((service) => service.id === id,) ?? services[0]

  return (
    <>
      <Head>
        <title>{service.title}</title>
      </Head>
      <header className="relative flex flex-col">
        <NavBar theme='dark' />
      </header>
      <PostBody post={service} />
      {flags.contact && <Contact
        title='Contact Us'
        subtitle='Ultrices volutpat et adipiscing eget est risus. Sed massa elementum nec, egestas amet tellus dictumst enim facilisis.'
        onSubmit={message => alert(JSON.stringify(message))}
      />}
    </>
  )
}

export const getStaticProps = ({ params }: any) => {
  const service = services.find((service) => service.id === params.id,) ?? services[0]
  return {
    props: {
      service,
    },
  }
}

export const getStaticPaths = () => {
  return (
    {
      paths: services.map((service) => ({
        params: {
          id: service.id,
        },
      })),
      fallback: false,
    }
  )
}

export interface PostInterface {
  /**
   * The title of the post
   */
  title: string;
  /**
   * The description of the post
   */
  description: string;
  /**
   * The image of the post
   */
  image: string;
  /**
   * The content of the post (in markdown format)
   */
  content: string;
  /**
   * The id of the post
   */
  id: string;
}

const PostBody = (props: { post: PostInterface }) => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-10 xl:px-16">
        <article className="">
          <h1
            className="text-center text-xl sm:text-2xl lg:text-4xl text-primary-400 font-semibold mb-6"
          >
            {props.post.title}
          </h1>

          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={props.post.image}
              height={600}
              width={800}
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown prose w-full prose-p:text-gray-900 prose-sm max-w-full mt-8" children={props.post.content} />
        </article>
      </div>
    </section>
  )
}
