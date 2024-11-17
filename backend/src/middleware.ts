import Client from 'twitter-api-sdk';

// here i could extend types instead of typing them any
export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    const client = new Client(token);

    const user = await client.users.findMyUser();

    if (!user || !user.data) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = {
      id: user.data.id,
      username: user.data.username,
    };

    next();
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
