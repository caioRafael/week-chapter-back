-- CreateTable
CREATE TABLE "BookCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "descrition" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "cover" TEXT,
    "publishedChapters" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "bookCategoryId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookCategory_id_key" ON "BookCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookCategory_category_key" ON "BookCategory"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_bookCategoryId_fkey" FOREIGN KEY ("bookCategoryId") REFERENCES "BookCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
