const { User, Product } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    User: async (parent, args, context, info) => {
      return User.find({});
    },

    Product: async (parent, args, context, info) => {
      if (args._id) return Product.find({ _id: args._id });

      if (args.category && args.category !== "any") {
        const products = await Product.find({ category: args.category });

        switch (args.advancedSort) {
          case "lowToHigh":
            products.sort((a, b) => {
              return a.price - b.price;
            });
            return products;

          case "highToLow":
            products.sort((a, b) => {
              return b.price - a.price;
            });
            return products;

          case "rating":
            products.sort((a, b) => {
              return a.rating.rate - b.rating.rate;
            });
            return products;

          default:
            return products;
        }
      }

      const products = await Product.find({});

      switch (args.advancedSort) {
        case "lowToHigh":
          products.sort((a, b) => {
            return a.price - b.price;
          });
          return products;

        case "highToLow":
          products.sort((a, b) => {
            return b.price - a.price;
          });
          return products;

        case "rating":
          products.sort((a, b) => {
            return a.rating.rate - b.rating.rate;
          });
          return products;

        default:
          return products;
      }
    },
  },

  Mutation: {
    addUser: async (parent, args, context, info) => {
      try {
        const userEmail = await User.find({ email: args.email });

        if (userEmail.length) return new AuthenticationError("Email is taken");

        const user = await User.create(args);

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log("error was caught server side", error);
      }
    },

    login: async (parent, { email, password }, context, info) => {
      const user = await User.findOne({ email });

      console.log(user);

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) throw new AuthenticationError("Incorrect Credentials");

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
