import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './src/singletons/database/drizzle',
  schema: './src/singletons/database/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
