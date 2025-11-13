export const dynamic = "force-dynamic";

import { getGlobalData } from "../../../utils/global-data";
import { getPostBySlug } from "../../../utils/mdx-utils";

import Layout, { GradientBackground } from "../../../components/Layout";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";

export default async function PostPage({ params }) {
  // Resolve a Promise do params
  const { id } = await params;

  if (!id) {
    return (
      <Layout>
        <Header name="Blog" />
        <main className="px-6 md:px-0">
          <h1 className="text-3xl text-center mt-8">❌ Post não encontrado</h1>
        </main>
        <Footer copyrightText="© 2025" />
      </Layout>
    );
  }

  // Busca dados em paralelo para melhor performance
  const [post, globalData] = await Promise.allSettled([
    getPostBySlug(id),
    Promise.resolve(getGlobalData())
  ]).then(([postResult, globalDataResult]) => [
    postResult.status === 'fulfilled' ? postResult.value : null,
    globalDataResult.status === 'fulfilled' ? globalDataResult.value : {
      name: "Blog",
      footerText: "© 2025 - Todos os direitos reservados",
    }
  ]);

  return (
    <Layout>
      <SEO
        title={`${post?.title || "Sem título"} - ${globalData.name}`}
        description={post?.description || ""}
      />
      <Header name={globalData.name} />

      <main className="px-6 md:px-0">
        <article className="prose dark:prose-invert max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl text-center mb-8">
            {post?.title || "Post não encontrado"}
          </h1>
          
          {post?.description && (
            <p className="text-lg opacity-70 mb-8 text-center">
              {post.description}
            </p>
          )}
          
          <div>
            {post?.body || (
              <p className="opacity-70">Sem conteúdo disponível...</p>
            )}
          </div>
        </article>
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