export function isUserAuthenticated(key: string | undefined) {
  return process.env.RECIPES_API_KEY === key;
}
