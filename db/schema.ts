import { pgTable, integer, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id').notNull(),
  shortCode: text('short_code').notNull(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
}, (table) => ({
  shortCodeIdx: uniqueIndex('short_code_idx').on(table.shortCode),
}));

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
