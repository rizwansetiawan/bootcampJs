-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
