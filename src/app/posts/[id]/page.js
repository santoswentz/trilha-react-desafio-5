export const dynamic = "force-dynamic";

import { getGlobalData } from "../../../utils/global-data";
import { getPostBySlug } from "../../../utils/mdx-utils";

import Layout, { GradientBackground } from "../../../components/Layout";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";

export default async function PostPage({ params }) {
  console.log("🔍 === INÍCIO DO COMPONENTE ===");
  console.log("🧩 1. params recebido:", params);
  console.log("🧩 2. Tipo do params:", typeof params);
  console.log("🧩 3. params é Promise?", params instanceof Promise);
  console.log("🧩 4. params tem then?", typeof params?.then);
  console.log("🧩 5. Keys do params:", Object.keys(params || {}));
  
  // Verifica se params tem propriedades próprias
  if (params) {
    console.log("🧩 6. Propriedades de params:");
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        console.log(`   - ${key}:`, params[key]);
      }
    }
  }

  // Tenta diferentes formas de acessar o ID
  let id;
  
  // Método 1: Acesso direto
  id = params?.id;
  console.log("🔍 Método 1 - params?.id:", id);
  
  // Método 2: Se for Promise, await
  if (params && typeof params.then === 'function') {
    console.log("🔍 Tentando await params...");
    try {
      const resolvedParams = await params;
      console.log("🔍 params após await:", resolvedParams);
      id = resolvedParams?.id;
      console.log("🔍 Método 2 - id após await:", id);
    } catch (error) {
      console.error("🔍 Erro no await params:", error);
    }
  }
  
  // Método 3: Destructuring
  try {
    const { id: id3 } = params || {};
    console.log("🔍 Método 3 - destructuring:", id3);
    if (!id && id3) id = id3;
  } catch (error) {
    console.error("🔍 Erro no destructuring:", error);
  }
  
  // Método 4: Object.values
  try {
    const values = Object.values(params || {});
    console.log("🔍 Método 4 - Object.values:", values);
    if (values.length > 0 && typeof values[0] === 'string') {
      id = values[0];
      console.log("🔍 ID encontrado em Object.values:", id);
    }
  } catch (error) {
    console.error("🔍 Erro em Object.values:", error);
  }

  console.log("🔍 ID final encontrado:", id);
  console.log("🔍 Tipo do ID:", typeof id);

  if (!id) {
    console.log("❌ NENHUM ID ENCONTRADO - Mostrando erro");
    console.log("🔍 Estrutura completa do params:", JSON.stringify(params, null, 2));
    return (
      <Layout>
        <Header name="Blog" />
        <main className="px-6 md:px-0">
          <article className="prose dark:prose-invert max-w-2xl mx-auto">
            <h1 className="text-3xl text-center mt-8">❌ Nenhum ID encontrado na rota.</h1>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <p>Params recebido: {JSON.stringify(params)}</p>
              <p>Tipo: {typeof params}</p>
            </div>
          </article>
        </main>
        <Footer copyrightText="© 2025" />
      </Layout>
    );
  }

  console.log("✅ ID encontrado:", id);

  let post = null;
  let globalData = {};

  try {
    console.log("🔍 Buscando post com ID:", id);
    post = await getPostBySlug(id);
    console.log("🔍 Post encontrado:", post ? "Sim" : "Não");
    if (post) {
      console.log("🔍 Título do post:", post.title);
    }
  } catch (error) {
    console.error("❌ Erro ao buscar post:", error);
  }

  try {
    console.log("🔍 Buscando globalData...");
    globalData = getGlobalData();
    console.log("🔍 globalData encontrado:", globalData);
  } catch (error) {
    console.error("❌ Erro ao buscar globalData:", error);
    globalData = {
      name: "Blog",
      footerText: "© 2025 - Todos os direitos reservados",
    };
  }

  console.log("🔍 === FIM DO COMPONENTE - RENDERIZANDO ===");

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