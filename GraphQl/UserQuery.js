const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");

const userSchema = {
  _id: {
    type: GraphQLString,
  },
  name: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name of User",
  },
  email: {
    type: GraphQLNonNull(GraphQLString),
    description: "Email of User",
  },
  age: {
    type: GraphQLInt,
    description: "Age of User",
  },
  password: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name of User",
  },
  createdAt: {
    type: GraphQLString,
    description: "Created User At",
  },
  location: {
    type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
    description: "Location of User",
  },
  alerts: {
    type: GraphQLList(GraphQLString),
    description: "Alerts for users",
  },
};

const userOptionalSchema = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
  },
  name: {
    type: GraphQLString,
    description: "Name of User",
  },
  email: {
    type: GraphQLString,
    description: "Email of User",
  },
  age: {
    type: GraphQLInt,
    description: "Age of User",
  },
  password: {
    type: GraphQLString,
    description: "Name of User",
  },
  createdAt: {
    type: GraphQLString,
    description: "Created User At",
  },
  location: {
    type: GraphQLList(GraphQLFloat),
    description: "Location of User",
  },
  alerts: {
    type: GraphQLList(GraphQLString),
    description: "Alerts for users",
  },
};

const userType = new GraphQLObjectType({
  name: "Users",
  description: "Users List",
  fields: () => ({ ...userSchema }),
});

module.exports = { userType, userSchema,userOptionalSchema };
