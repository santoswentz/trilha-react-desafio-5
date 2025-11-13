export const dynamic = "force-dynamic"; // 🔥 impede erro no build (SSR forçado)

import Link from "next/link";
import { getPosts } from "../utils/mdx-utils";
import { getGlobalData } from "../utils/global-data";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout, { GradientBackground } from "../components/Layout";
import ArrowIcon from "../components/ArrowIcon";
import SEO from "../components/SEO";

export default async function IndexPage() {
  let posts = [];
  let globalData = {};

  try {
    // 🔥 Evita crash se API externa (ex: Supabase) falhar no build
    posts = await getPosts();
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    posts = [];
  }

  try {
    globalData = getGlobalData();
  } catch (error) {
    console.error("Erro ao buscar globalData:", error);
    globalData = {
      name: "Wentz Blog",
      blogTitle: "Meu Blog",
      footerText: "© 2025 - Todos os direitos reservados",
    };
  }

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />

      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>

        <ul className="w-full">
          {posts.length === 0 && (
            <p className="text-center opacity-60">Nenhum post encontrado.</p>
          )}
          {posts.map((post) => (
            <li
              key={post.id}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                href={`/posts/${post.id}`}
                className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4"
              >
                {post.created_at && (
                  <p className="uppercase mb-3 font-bold opacity-60">
                    {post.created_at}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                {post.description && (
                  <p className="mt-3 text-lg opacity-60">
                    {post.description}
                  </p>
                )}
                <ArrowIcon className="mt-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer copyrightText={globalData.footerText} />

      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}
