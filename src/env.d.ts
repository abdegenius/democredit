declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: "local" | "development" | "production";
  }
}
