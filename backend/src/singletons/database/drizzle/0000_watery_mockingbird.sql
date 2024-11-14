CREATE TABLE IF NOT EXISTS "wallets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "wallets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"walletAddress" varchar(255) NOT NULL,
	"twitterId" varchar(255) NOT NULL
);
