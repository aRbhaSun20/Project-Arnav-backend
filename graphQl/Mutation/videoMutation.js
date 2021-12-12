const { GraphQLBoolean } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

const videoMutation = {
  uploadVideo: {
    description: "Uploads an video.",
    type: GraphQLBoolean,
    args: {
      video: {
        description: "Video file.",
        type: GraphQLUpload,
      },
    },
    resolve: async (parent, { image }) => {
      const { filename, mimetype, createReadStream } = await image;
      const stream = createReadStream();
      // Promisify the stream and store the file, then…
      return true;
    },
  },
};

module.exports = { videoMutation };
