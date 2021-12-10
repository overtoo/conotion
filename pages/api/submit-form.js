const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { zw, english, comment, tags } = JSON.parse(req.body);
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        zw: {
          title: [
            {
              text: {
                content: zw,
              },
            },
          ],
        },
        English: {
          rich_text: [
            {
              text: {
                content: english,
              },
            },
          ],
        },
        Tags: {
          multi_select: [
            {
              name: tags,
            },
          ],
        },
        Comment: {
          rich_text: [
            {
              text: {
                content: comment,
              },
            },
          ],
        },
      },
    });
    res.status(201).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error" });
  }
}

module.exports = allowCors(handler);
