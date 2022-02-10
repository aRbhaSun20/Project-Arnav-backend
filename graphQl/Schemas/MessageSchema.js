const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const { userType } = require("./UserSchema");

const MessageSchema = {
  _id: {
    type: GraphQLString,
  },
  message: {
    type: GraphQLString,
    description: "Message",
  },
  createdAt: {
    type: GraphQLString,
    description: "Message Timestamp ",
  },
  senderUserId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Sender User",
  },
  receiverUserId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Receiver User",
  },
};

const messageOptionalSchema = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
  },
  message: {
    type: GraphQLString,
    description: "Message",
  },
  createdAt: {
    type: GraphQLString,
    description: "Message Timestamp ",
  },
  senderUserId: {
    type: GraphQLString,
    description: "Sender User",
  },
  receiverUserId: {
    type: GraphQLString,
    description: "Receiver User",
  },
};

const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Messages",
  fields: () => ({ ...MessageSchema }),
});

module.exports = { MessageType, MessageSchema, messageOptionalSchema };
