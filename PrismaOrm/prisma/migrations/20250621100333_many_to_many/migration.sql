-- CreateTable
CREATE TABLE "GroupPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnGroupPosts" (
    "userId" TEXT NOT NULL,
    "groupPostId" TEXT NOT NULL,

    CONSTRAINT "UserOnGroupPosts_pkey" PRIMARY KEY ("userId","groupPostId")
);

-- AddForeignKey
ALTER TABLE "UserOnGroupPosts" ADD CONSTRAINT "UserOnGroupPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnGroupPosts" ADD CONSTRAINT "UserOnGroupPosts_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
