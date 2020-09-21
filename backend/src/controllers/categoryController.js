const Category = require("../models/categoryModel");
const slugify = require("slugify");

exports.createCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const newCategory = new Category(categoryObj);
  newCategory.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

function createCatrgotyList(category, parentId = null) {
  categoryList = [];
  let categories;
  if (parentId == null) {
    categories = category.filter((cate) => cate.parentId == undefined);
  } else {
    categories = category.filter((cate) => cate.parentId == parentId);
  }
  // console.log(categories)
  categories.forEach(cate => {
    // console.log(cate)

    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCatrgotyList(category, cate._id),
    });
    console.log(categoryList)

  })
  return categoryList;
}

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      const categoryList = createCatrgotyList(category);
      console.log(createCatrgotyList(category))
      return res.status(200).json({ categoryList });
    }
  });
};
