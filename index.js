const express = require("express");

//for video upload

const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const app = express();

//middleware -Video upload

app.use(bodyParser.json());
app.use(methodOverride("_method"));

const mongoose = require("mongoose");

//mongo URI
const mongoURI =
  "mongodb+srv://arbhasun:aBIX7Ekbr7Uif5wq@cluster0.w2if5.mongodb.net/ArNav?retryWrites=true&w=majority";

// mongo connection
const conn = mongoose.createConnection(mongoURI);

//gfs stream
let gfs;

conn.once("open", () => {
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
//create storage engine

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const cors = require("cors");

const RootMutationType = require("./graphQl/mutationQuery");
const RootQueryType = require("./graphQl/rootQuery");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected to db"))
  .catch((e) => console.log(e));

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

//@route POST
//@desc uploads file to DB

app.use(express.json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(express.static("public"));

var router = express.Router();
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Response: ", res);
  res.json({ file: req.file });
});
//app.use("/uploads", router);

// const routes = require("./Routes");

// app.use("/", routes);

const port = process.env.PORT || 5300;

app.listen(port, () => console.log(`Server started at port ${port}`));
