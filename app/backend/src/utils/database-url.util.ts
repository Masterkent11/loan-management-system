const IGNORED_DATABASE_URL_PARAMS = ["channel_binding"];

export const normalizeDatabaseUrl = (databaseUrl: string) => {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(databaseUrl);
  } catch {
    return databaseUrl;
  }

  IGNORED_DATABASE_URL_PARAMS.forEach((parameter) => {
    parsedUrl.searchParams.delete(parameter);
  });

  return parsedUrl.toString();
};
