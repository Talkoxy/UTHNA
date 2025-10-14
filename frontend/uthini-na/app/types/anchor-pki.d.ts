// /app/types/anchor-pki.d.ts

declare module 'anchor-pki/auto-cert/integrations/next' {
  // FIX: Suppress the lint error for the use of 'any' on the next line.
  // This is acceptable here because we are forced to use 'any' for an untyped external module.
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const autoCert: any; 
  export default autoCert;
}