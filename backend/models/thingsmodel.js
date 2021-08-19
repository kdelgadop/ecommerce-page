const mongoose = require('mongoose');

const thingsSchema = new mongoose.Schema({
      id: {
        type: String,
        require: true,
      },
      img: {
          type: String,
          require: true,
      },
      name: {
        type: String,
        require: true,
      },
      price: {
        type: String,
        require: false,
      },
      description: {
        type: String,
        require: false,
      },
});

// const otherThingsSchema = new mongoose.Schema({
//       num: {
//         type: Number,
//         require: true,
//     },
//       img: {
//         type: String,
//         require: true,
//     },
//       name: {
//         type: String,
//         require: true,
//     },
//       description: {
//         type: String,
//         require: true,
//     },
// }, { timestamps: true });

module.exports = mongoose.model("Thing", thingsSchema);
// module.export = mongoose.model("OtherThing", otherThingsSchema);