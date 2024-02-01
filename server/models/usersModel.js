const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const shippingSchema = new mongoose.Schema({
  line1: { type: String, required: false },
  line2: { type: String, required: false },
  postal_code: { type: String, required: false },
  city: { type: String, required: false },
})

const usersSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150",
    },
    fullName: { type: String, required: false },
    phoneNumber: { type: Number, required: false },
    roles: [
      {
        type: String,
        default: "User",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    shipping: [shippingSchema],
    facebookId: { type: String, required: false, unique: true },
  },
  {
    timestamps: true,
  }
)

// On save hook, encrypt password
// Before saving a model, run this function
usersSchema.pre("save", function (next) {
  const user = this // user.email, user.password

  if (this.isModified("password") || this.isNew) {
    // generate a salt
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          // overwrite plain text password with encrypted password
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

usersSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

module.exports = mongoose.model("users", usersSchema)
