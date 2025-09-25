// api/index.js - API route for Vercel

const clientFactory = require("./client");

const users = require("./users");
const apps = require("./apps");
const scopes = require("./scopes");
const credentials = require("./credentials");
const tokens = require("./tokens");

module.exports = async function handler(req, res) {
  const client = clientFactory({}); // مرر options لو محتاج
  try {
    const data = {
      users: await users(client).list(),
      apps: await apps(client).list(),
      scopes: await scopes(client).list(),
      credentials: await credentials(client).list(),
      tokens: await tokens(client).list(),
    };

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
