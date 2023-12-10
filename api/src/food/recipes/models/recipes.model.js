const { mongoose } = require('../../../common/services/mongoose.service');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: String,
  ingredients: [String],
  image: {
    data: Buffer,
    contentType: String,
  },
  instructions: String,
  notes: String,
  authorName: String,
  estimatedTime: String,
  category: String,
  caloriesPerPortion: Number,
  amountOfPortions: Number,
});
const Recipe = mongoose.model('Recipes', recipeSchema);

recipeSchema.virtual('id').get(() => this._id.toHexString());

recipeSchema.findById = (cb) => this.model('Recipes').find({ id: this.id }, cb);

exports.findByEmail = (email) => Recipe.find({ email });

exports.findById = (id) =>
  Recipe.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });

exports.createRecipe = (recipeData) => {
  const recipe = new Recipe(recipeData);
  return recipe.save();
};

exports.list = (perPage, page) =>
  new Promise((resolve, reject) => {
    Recipe.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, recipes) => {
        if (err) {
          reject(err);
        } else {
          resolve(recipes);
        }
      });
  });

exports.patchRecipe = (id, recipeData) =>
  Recipe.findOneAndUpdate({ _id: id }, recipeData);

exports.removeById = (recipeId) =>
  new Promise((resolve, reject) => {
    Recipe.deleteMany({ _id: recipeId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
