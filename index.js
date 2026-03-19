import express from "express";
import cors from "cors";
import routerApi from "./routes/index.js";
import {  LogErrors, errorHandler, boomErrorHandler } from "./middlewares/errorHandler.js";



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ["http://localhost:8080", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  }
}
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Welcome to My port!");
})

app.get("/new-route", (req, res) => {
  res.send("Hello, i'm a new route!");
})

routerApi(app);

app.use(LogErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get("/categories/:categoryId/products/:productId", (req, res) => {
   const { categoryId, productId } = req.params;
   res.json({
     categoryId,
     productId
   });
})

app.listen(port, () => {
  console.log(`My port is ${port}`);
});


app.get("/users", (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.json({
      message: "Please provide limit and offset query parameters"
    })
  }
})

export default app;
