const express = require("express");

const bodyParser = require("body-parser");
const crypto = require("crypto");

const methodOverride = require("method-override");
const app = express();
<<<<<<< HEAD
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

//storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    console.log("Inside the file request!", req.query.location);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: { locationName: req.query.location },
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
=======
>>>>>>> 6d89a35df09499030f3e295266ddfa9009224aa4

const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const router = express.Router();
const cors = require("cors");

const RootMutationType = require("./graphQl/mutationQuery");
const RootQueryType = require("./graphQl/rootQuery");
const { Authentication } = require("./middlewares/Authentication");
const videoRouter = require("./routes/video");
require("dotenv").config();

app.use(bodyParser.json());

app.use(methodOverride("_method"));

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.set("view engine", "ejs");

//@ROUTE GET
//@desc Loads Form
app.get("/", (req, res) => {
  res.render("index");
});

//@route POST
//@desc uploads file to DB
app.use(express.json());
app.use(cors());

app.use("/", videoRouter);

app.use(Authentication);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(express.static("public"));

//@route POST
//@desc: Uploads File to DB

// app.post("/upload", upload.single("file"), (req, res) => {
//   // Entire logic will come here
//   res.redirect("/");
// });


// @route GET /files
// @desc  Display all files in JSON
// app.get("/files", (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: "No files exist",
//       });
//     }

//     // Files exist
//     return res.json(files);
//   });
// });

//@route GET/FILES
//@DESC: display files
// app.get("/files/:filename", (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: "No file exists",
//       });
//     }
//     // File exists
//     return res.json(file);
//   });
// });

// @route GET /video/:filename
// @desc Display file
// app.get("/video/:filename", (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: "No file exists",
//       });
//     }

//     // Check if video
//     if (file.contentType === "video/mp4") {
//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: "Not a video",
//       });
//     }
//   });
// });

// @route DELETE /files/:id
// @desc  Delete file
// app.delete("/files/:id", (req, res) => {
//   gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
//     if (err) {
//       return res.status(404).json({ err: err });
//     }

//     res.redirect("/");
//   });
// });

//app.use("/uploads", router);

// const routes = require("./Routes");

// app.use("/", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));

// module.exports = { gfs };
