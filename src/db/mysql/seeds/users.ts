import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: "47c1bc94-dacd-42ce-a8f7-2402723c9f06",
      email: "john@gmail.com",
      fullname: "John Doe",
      password: "$2b$10$hYPvbh3i2YP1rbpumLgi7uACiJtvyMxfy0xcwZEy6.9XGJCCVRRfm",
      isVerified: true,
      createdAt: "2025-01-23T18:59:15.000",
      updatedAt: "2025-01-23T18:59:15.000",
    },
    {
      id: "76a9b01b-c3a1-401e-b042-86e6ac1eb657",
      email: "jane@gmail.com",
      fullname: "Jane Doe",
      password: "$2b$10$Ejk1XgceL9TW1/7TqdDbDetRt5uKbOzfhbeq8dyBU1J/K32kE3TlC",
      isVerified: true,
      createdAt: "2025-01-23T18:49:51.000",
      updatedAt: "2025-01-23T18:49:51.000",
    },
    {
      id: "8de85847-8d74-4520-bdb3-4d2bc2c7466d",
      email: "james@gmail.com",
      fullname: "James",
      password: "$2b$10$.CtcjGRbiF7ARTtsnUeDBuXW0B9K83SUfqpFj9vOWqCaSltv8Zku.",
      isVerified: true,
      createdAt: "2025-01-23T19:46:12.000",
      updatedAt: "2025-01-23T19:46:12.000",
    },
  ]);
}
