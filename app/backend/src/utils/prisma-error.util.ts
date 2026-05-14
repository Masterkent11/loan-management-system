import { Prisma } from "@prisma/client";

export const getPrismaErrorDetails = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      code: error.code,
      message: error.message,
      meta: error.meta,
      name: error.name,
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      code: error.errorCode,
      message: error.message,
      name: error.name,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
    };
  }

  return { message: "Unknown error type" };
};

export const isDatabaseSetupError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return ["P1001", "P2021", "P2022"].includes(error.code);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  return false;
};
