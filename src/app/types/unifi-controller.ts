import z from 'zod';

export const uniFiControllerResponseSchema = z.object({
  meta: z.object({
    msg: z.string().optional(),
    rc: z.enum(['ok', 'error']),
  }),
});
