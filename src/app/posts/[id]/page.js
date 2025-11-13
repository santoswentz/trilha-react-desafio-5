export const dynamic = "force-dynamic"; // evita cache e build quebrado

import { getGlobalData } from "../../../utils/global-data";
import { getPostBySlug } from "../../../utils/mdx-utils";

import Layout, { GradientBackground } from "../../../components/Layout";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";

export default async function PostPage({ params }) {
  
  const resolvedParams = await params; // 👈 aguarda resolver 
  console.log("🧩 params resolvidos:", resolvedParams);
  const idresolvedParams = resolvedParams.Promise.id ; // 👈 aguarda resolver
  console.log("🧩 id dos params resolvidos:", idresolvedParams);
  const { id } = resolvedParams?.Promise?.id || {};
  console.log("=========================================================================")
  console.log("🧩 id extraído dos params:", id);

  if (!id) {
    return <h1>❌ Nenhum ID encontrado na rota.</h1>;
  }

  let post = null;
  let globalData = {};

  try {
    post = await getPostBySlug(id);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
  }

  try {
    globalData = getGlobalData();
  } catch (error) {
    console.error("Erro ao buscar globalData:", error);
    globalData = {
      name: "Blog",
      footerText: "© 2025 - Todos os direitos reservados",
    };
  }
 

  return (
    <Layout>
      <SEO
        title={`${post.title} - ${globalData.name}`}
        description={post.description || ""}
      />
      <Header name={globalData.name} />

      <main className="px-6 md:px-0">
        <article className="prose dark:prose-invert max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl text-center mb-8">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg opacity-70 mb-8 text-center">
              {post.description}
            </p>
          )}
          <div>
            {post.body || (
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
