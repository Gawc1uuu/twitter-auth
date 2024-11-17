import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../singletons/database/db';
import { walletsTable } from '../singletons/database/schema';

interface CustomRequest extends Request {
  user?: any; // Adjust the type of user as necessary
}

export const addWallet = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const { walletAddress, userId: twitterId } = req.body;

  console.log('im here');
  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    // const user = req.user;
    // if(!user){
    //   res.status(403).json({message:"unathorized"})
    // }

    const [existingWallet] = await db
      .select()
      .from(walletsTable)
      .where(eq(walletsTable.walletAddress, walletAddress));

    if (existingWallet) {
      res.status(400).json({ message: 'wallet already submitted' });
      return;
    }

    await db.insert(walletsTable).values({
      walletAddress,
      twitterId,
    });

    return res.status(200).json({ message: 'inserted correctly' });
  } catch (err: any) {
    console.error('Error adding wallet address:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllWallets = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allWallets = await db.select().from(walletsTable);
    return res.status(200).json({ allWallets });
  } catch (err: any) {
    console.error('Error adding wallet address:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
