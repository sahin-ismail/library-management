-- Create Users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

-- Create Books table
CREATE TABLE IF NOT EXISTS "books" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

-- Create Borrows table
CREATE TABLE IF NOT EXISTS "borrows" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
  "bookId" INTEGER REFERENCES "books"("id") ON DELETE CASCADE,
  "score" INTEGER
);

-- Insert sample data into Users table
INSERT INTO "users" ("name") VALUES
('Enes Faruk Meniz'),
('Eray Aslan'),
('Kadir Mutlu'),
('Sefa Eren Şahin');

-- Insert sample data into Books table
INSERT INTO "books" ("name") VALUES
('1984'),
('Brave New World'),
('Dune'),
('I, Robot'),
('The Hitchhiker Guide to the Galaxy');

-- Insert sample data into Borrows table
INSERT INTO "borrows" ("userId", "bookId", "score") VALUES
(2, 2, 5),
(2, 5, 10);
