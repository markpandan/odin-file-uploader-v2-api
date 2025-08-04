-- DropForeignKey
ALTER TABLE "public"."Folders" DROP CONSTRAINT "Folders_parentId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Folders" ADD CONSTRAINT "Folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
