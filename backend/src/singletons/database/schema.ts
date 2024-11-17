import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const walletsTable = pgTable('wallets', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  walletAddress: varchar({ length: 255 }).notNull(),
  twitterId: varchar({ length: 255 }).notNull(),
});
