import { internalMutation } from "./_generated/server";

export const dailyCleanup = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Clear all tables
    const tables = await ctx.db.query("tables").collect();
    for (const table of tables) {
      await ctx.db.delete(table._id);
    }

    // 2. Clear waitlist
    const waitlist = await ctx.db.query("waitlist").collect();
    for (const entry of waitlist) {
      await ctx.db.delete(entry._id);
    }

    console.log(
      `Daily cleanup executed. Deleted ${tables.length} tables and ${waitlist.length} waitlist entries.`
    );
  },
});
