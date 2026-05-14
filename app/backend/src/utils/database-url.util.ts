const IGNORED_DATABASE_URL_PARAMS = ["channel_binding"];

export const normalizeDatabaseUrl = (databaseUrl: string) => {
  const parsedUrl = new URL(databaseUrl);

  IGNORED_DATABASE_URL_PARAMS.forEach((parameter) => {
    parsedUrl.searchParams.delete(parameter);
  });

  return parsedUrl.toString();
};
