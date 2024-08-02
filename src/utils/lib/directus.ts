import { RestCommand, createDirectus, rest } from "@directus/sdk";

import { ACCESS_TOKEN_KEY } from "@/utils/constants/key";

import { staticToken } from "@directus/sdk";
import { getCookie } from "cookies-next";

const directus = createDirectus(process.env.API_URL ?? "").with(rest());
export default directus;

/**
 * Hàm chung để thực hiện các thao tác với Directus API.
 * @param {RestCommand<unknown, any>} method - Phương thức API cần thực hiện.
 * @returns {Promise<unknown>} - Dữ liệu trả về từ API.
 */
export const requestToAPI = async (
  method: RestCommand<unknown, any>
): Promise<unknown> => {
  const token = getCookie(ACCESS_TOKEN_KEY);

  try {
    return await directus.with(staticToken(token ?? "")).request(method);
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};
