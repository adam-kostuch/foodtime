const { mongoose } = require('../../common/services/mongoose.service');

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
});
const User = mongoose.model('Users', userSchema);

userSchema.virtual('id').get(() => this._id.toHexString());

userSchema.findById = (cb) => this.model('Users').find({ id: this.id }, cb);

exports.findByEmail = (email) => User.find({ email });

exports.findById = (id) =>
  User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.list = (perPage, page) =>
  new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });

exports.patchUser = (id, userData) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    userData
  );

exports.removeById = (userId) =>
  new Promise((resolve, reject) => {
    User.deleteMany({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
