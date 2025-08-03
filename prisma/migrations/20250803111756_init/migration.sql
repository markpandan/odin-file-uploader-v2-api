-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "directory" TEXT,
    "parentId" TEXT,
    "ownerId" TEXT NOT NULL,
    "to_share" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "public"."Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Folders_parentId_key" ON "public"."Folders"("parentId");

-- AddForeignKey
ALTER TABLE "public"."Files" ADD CONSTRAINT "Files_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Files" ADD CONSTRAINT "Files_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Folders" ADD CONSTRAINT "Folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Folders" ADD CONSTRAINT "Folders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
