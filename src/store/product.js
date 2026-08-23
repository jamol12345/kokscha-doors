import { defineStore } from "pinia";
import axios from "axios";
import i18n from "@/i18n";

const api = axios.create({
  baseURL: "/api",
});

export const useProductStore = defineStore("product", () => {
  const getProducts = async ({ limit = 12, skip = 0 } = {}) => {
    const { data } = await api.get("/doors");

    const mapped = data.map(mapDoorToProduct);

    return {
      data: {
        products: mapped.slice(skip, skip + limit),
        total: mapped.length,
      },
    };
  };

  const getProductsByCategory = async (category) => {
    const { data } = await api.get("/doors");

    const list = Array.isArray(data) ? data : data.doors || [];

    const filtered = list.filter((item) => item.type === category);

    const mapped = filtered.map(mapDoorToProduct);

    return {
      data: {
        products: mapped,
        total: mapped.length,
      },
    };
  };

  const getProduct = async (id) => {
    try {
      const { data } = await api.get("/doors");

      const list = Array.isArray(data) ? data : data.doors || [];

      const found = list.find((item) => item.id == id);

      return {
        data: mapDoorToProduct(found || {}),
      };
    } catch (error) {
      console.error("getProduct error:", error);
      return { data: {} };
    }
  };

  const getCategories = async () => {
    const { data } = await api.get("/doors");

    const list = Array.isArray(data) ? data : data.doors || [];

    // берём type как категорию
    const categories = [...new Set(list.map((item) => item.type))];

    return { data: categories };
  };

  const mapDoorToProduct = (item) => {
    return {
      id: item.id,

      // 👇 главное изменение
      title: item.model,

      description: item.description || "",

      price: item.price || 0, // если цены нет на бэке

      discountPercentage: 0,

      thumbnail: item.image
        ? "https://kukcha-doors.up.railway.app" + item.image
        : "",

      category: item.type || "doors",

      stock: item.fill ? parseInt(item.fill) : 0,

      type: item.type,
      style: item.style,
      color: item.color,
      size: item.size,
      fill: item.fill,
    };
  };

  return { getProducts, getProduct, getCategories, getProductsByCategory };
});
