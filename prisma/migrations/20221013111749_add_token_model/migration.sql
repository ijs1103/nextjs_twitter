-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_number_key" ON "Token"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Token_phone_key" ON "Token"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Token_email_key" ON "Token"("email");
