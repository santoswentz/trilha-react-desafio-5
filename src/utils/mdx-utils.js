import { api } from "../services/api";

export const getPosts = async () => {
  try {
    const { data } = await api.get("/posts?select=*");

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("❌ Erro ao buscar posts:", error.message || error);
    // evita quebrar o build/prerender
    return [];
  }
};

export const getPostBySlug = async (id) => {
  if (!id) {
    console.error("❌ Nenhum ID recebido no getPostBySlug");
    return null;
  }

  try {
    const { data } = await api.get(`/posts?select=*&id=eq.${id}`); // ele provavelmente está com a route errada
    if (Array.isArray(data) && data.length > 0) {
    console.log("🧩 dados da api getPostBySlug vieram zerados no data"); //retirar aqui e volta a funcionar
      return data[0];
    }
    return null;
  } catch (error) {
    console.error(`❌ Erro ao buscar post com id=${id}:`, error.message || error);
    return null;
  }
};

