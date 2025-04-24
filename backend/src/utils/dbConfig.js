export function buildConnectionString() {
  const {
    DB_SERVER,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
  } = process.env;

  return `sqlserver://${DB_SERVER}:1433;database=${DB_NAME};user=${DB_USER};password=${DB_PASSWORD};encrypt=true;trustServerCertificate=false;connectionTimeout=30`;
}
