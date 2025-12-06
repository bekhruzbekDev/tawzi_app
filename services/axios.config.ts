import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "uz",
  },
  withCredentials: false, // RN’da cookie ishlamaydi
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.append(key, value as any);
      }
    });
    return searchParams.toString();
  },
});

// Request interceptor: token va headers
instance.interceptors.request.use(
  async (config) => {
    // Language
    const lang = (await AsyncStorage.getItem("lang")) || "uz";
    config.headers["Accept-Language"] = lang;

    // Access token
    if (!config.url?.includes("/login")) {
      const token = config.url?.includes("/auth/user/")
        ? await AsyncStorage.getItem("refresh_token")
        : await AsyncStorage.getItem("access_token");

      if (token) config.headers.Authorization = `Bearer ${token}`;

      // Company ID
      const companyInfo = await AsyncStorage.getItem("companyInfo");
      try {
        const parsed = JSON.parse(companyInfo || "{}");
        if (parsed.id) config.headers["X-Organization-ID"] = parsed.id;
      } catch {}
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: xatolarni toast qilish
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Access token yaroqsiz bo‘lsa logout qilamiz
      await AsyncStorage.removeItem("access_token");
      Toast.show({
        type: "error",
        text1: "Siz tizimdan chiqdingiz. Iltimos qayta login qiling.",
      });
    } else if (status >= 500) {
      Toast.show({
        type: "error",
        text1: "Server xatosi, keyinroq urinib ko‘ring",
      });
    } else if (status === 403) {
      Toast.show({ type: "error", text1: "Ruxsat yo‘q" });
    } else if (status === 404) {
      Toast.show({ type: "error", text1: "Ma'lumot topilmadi" });
    } else if (status === 400 && error.response?.data?.detail) {
      Toast.show({ type: "error", text1: error.response.data.detail });
    }

    return Promise.reject(error.response?.data || error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // ⛔ 401 — Access token muddati tugagan, refresh qilish

    // 🚨 Umumiy errorlar: 500 yoki boshqalar uchun toast
    // if (status >= 500) {
    //   toast.error("Serverda xatolik yuz berdi. Keyinroq urinib ko‘ring.");
    // } else if (status === 403) {
    //   toast.error("Sizda bu amalni bajarish uchun ruxsat yo‘q.");
    // } else if (status === 404) {
    //   toast.error("Ma'lumot topilmadi.");
    // } else if (status === 400 && error.response?.data?.detail) {
    //   toast.error(error.response.data.detail);
    // }

    return Promise.reject(error.response?.data || error);
  }
);
export default instance;
