const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const cors = require("cors");

const mongoose = require("mongoose");

const RootMutationType = require("./graphQl/mutationQuery");
const RootQueryType = require("./graphQl/rootQuery");
const { Authentication } = require("./middlewares/Authentication");
const loginRouter = require("./routes/login");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected to db"))
  .catch((e) => console.log(e));

const app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(express.json());
app.use(cors());

app.use("/", loginRouter);

app.use(Authentication);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(express.static("public"));

// const routes = require("./Routes");

// app.use("/", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
