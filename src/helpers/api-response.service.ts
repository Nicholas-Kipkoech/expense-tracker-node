export interface Response<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export function ApiResponse<T>(
  success: boolean,
  message: string,
  data: T | null,
): Response<T> {
  return { success, message, data };
}
