import express from "express";
const router = express.Router();

router.get("/env", (req, res) => {
  res.json({
    CORS_URLS: process.env.CORS_URLS,
    NODE_ENV: process.env.NODE_ENV,
  });
});

export default router;
