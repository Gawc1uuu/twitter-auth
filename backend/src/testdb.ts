import { db } from './singletons/database/db'; // Adjust the import path accordingly
import { walletsTable } from './singletons/database/schema'; // Adjust the import path accordingly

async function testDbConnection() {
    try {
        // Attempt to retrieve data from `wallets` table
        const wallets = await db.select().from(walletsTable).execute();
        console.log("DB Connection Successful! Wallets:", wallets);
    } catch (error) {
        console.error("DB Connection Failed:", error);
    }
}

testDbConnection();
