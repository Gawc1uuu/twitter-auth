import { Request, Response } from 'express';
import { authClient, client, STATE } from '../server';

export const callbackTwitterAuth = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { code, state } = req.query;

    // Validate state
    if (state !== STATE) {
      return res.status(500).send("State isn't matching");
    }

    // Request access token using the code
    const token = await authClient.requestAccessToken(code as string);
    const user = await client.users.findMyUser();

    // commented it out because this endpoint no longer works for basic and pro plans

    // const followingResponse = await client.users.usersIdFollowing(user.data?.id!)

    // const isFollowing = followingResponse.data?.some(
    //   (account) => account.username === "invariant_labs"
    // );

    // Redirect to tweets
    // return res.redirect(`/tweets?isLoggedIn=${true}&token=${token.token.access_token}&isFollowing=${isFollowing}`);
    return res.redirect(
      `/add?loggedIn=true&token=${token.token.access_token}&userId=${user.data?.id}`
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred');
  }
};

export const login = async (req: Request, res: Response) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: 's256',
  });
  res.redirect(authUrl);
};

export const revoke = async (req: Request, res: Response) => {
  try {
    const response = await authClient.revokeAccessToken();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
