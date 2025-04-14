import z from "zod";

export const spaceSchema = z.object({
  spaceName: z.string(),
  spaceHandle: z.string(),
  spaceImg: z.string().url().optional(),
  spaceDescription: z.string().optional(),
  isPublic: z.boolean(),
});
