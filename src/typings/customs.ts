export interface MakeResponse<T = Record<string, any>> {
  status: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

// Table Types
export const Tables = {
  User: "users",
  File: "files",
} as const;
