import axios from "axios";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, hostWallets } = req.body;

    const { data } = await axios.post(
      "https://api.huddle01.com/api/v1/create-room",
      {
        title,
        hostWallets,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "qgoZqCLhcqDKyhAnNXKfXMvXGjmalEoy",
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
