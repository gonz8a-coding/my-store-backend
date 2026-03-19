import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Gonza"
    },
    {
      id: 2,
      name: "Sofi"
    }
  ]);
});

export default router;
