export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

export function isValidCredentials(username: string, password: string) {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
} 