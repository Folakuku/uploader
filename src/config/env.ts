const Database = {
  MongoDB: "mongodb",
  MySql: "mysql",
} as const;

type TDatabase = (typeof Database)[keyof typeof Database];

// Check for the Database Selected
const dbType = process.env.DB_TYPE as TDatabase;

if (!dbType || !Object.values(Database).includes(dbType)) {
  throw new Error(
    `Required environment variable DB_TYPE must be one of ${Object.values(
      Database
    )}`
  );
}

// set default env variables
const defaultEnv = {
  db_type: process.env.DB_TYPE as TDatabase,
  app_name: process.env.APP_NAME || "Uploader API",
  port: Number(process.env.PORT) || 5000,
  jwt_secret: process.env.JWT_SECRET,
  salt_rounds: Number(process.env.SALT_ROUNDS) || 10,

  // Redis
  redis_port: Number(process.env.REDIS_PORT) || 6379,
  redis_host: process.env.REDIS_HOST || "127.0.0.1",
  // redis_username: process.env.REDIS_USERNAME,
  redis_password: process.env.REDIS_PASSWORD || "",

  //Email
  email_username: process.env.EMAIL_USERNAME,
  email_password: process.env.EMAIL_PASSWORD,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT || 465,

  //S3
  aws_access_key: process.env.AWS_ACCESS_KEY_ID || "***",
  aws_secret_key: process.env.AWS_SECRET_ACCESS_KEY || "***",
  aws_bucket: process.env.AWS_S3_BUCKET || "***",
  aws_region: process.env.AWS_REGION || "***",
} as const;

// set MySQL env variables
const mysqlEnv = {
  db_host: process.env.MYSQL_DB_HOST,
  db_user: process.env.MYSQL_DB_USER,
  db_password: process.env.MYSQL_DB_PASSWORD,
  db_name: process.env.MYSQL_DB_NAME,
};

// set MongoDB env variable
const mongodbEnv = {
  mongodb_uri: process.env.MONGO_DB_URI,
};

const dbEnv = dbType === Database.MySql ? mysqlEnv : mongodbEnv;

const requiredEnv = { ...defaultEnv, ...dbEnv } as const;

// Validate missing required env variables
const missingEnvVars = Object.entries(requiredEnv)
  .filter(([_, value]) => value === undefined)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

const env = { ...defaultEnv, ...mysqlEnv, ...mongodbEnv };

export default env;
