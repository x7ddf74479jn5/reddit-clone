declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_STEPZEN_KEY: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
  }
}
