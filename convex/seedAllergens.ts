import { internalMutation, internalQuery } from "./_generated/server";

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allergens = [
      "Gluten",
      "Crustáceos",
      "Huevos",
      "Pescado",
      "Cacahuetes",
      "Soja",
      "Leche",
      "Frutos de cáscara",
      "Apio",
      "Mostaza",
      "Granos de sésamo",
      "Dióxido de azufre y sulfitos",
      "Altramuces",
      "Moluscos",
    ];

    let createdCount = 0;
    let existingCount = 0;

    for (const allergenName of allergens) {
      const existing = await ctx.db
        .query("allergens")
        .filter((q) => q.eq(q.field("name"), allergenName))
        .first();

      if (!existing) {
        await ctx.db.insert("allergens", { name: allergenName });
        createdCount++;
      } else {
        existingCount++;
      }
    }

    return {
      success: true,
      message: `Seeding complete. Created: ${createdCount}, Skipped: ${existingCount}`,
    };
  },
});

export const list = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("allergens").collect();
  },
});
