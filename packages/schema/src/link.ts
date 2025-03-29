import z from "zod";

export const linkSchema = z.object({
  url: z.string().url("Invalid url format!"),
  thoughts: z.string().optional(),
  collectionId: z.string().optional(),
  spaceId: z.string().optional(),
});
