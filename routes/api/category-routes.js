const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//custome middleware to check if the given id/category_name exists in the database
const findTarget = async (req, res, next) => {
  try {
    if (req.params.id) {
      const categoryById = await Category.findOne({
        where: { id: req.params.id },
        include: { model: Product }
      });
      req.body.categoryById = categoryById;
    } else if (req.body.category_name) {
      const categoryByName = await Category.findOne({
        where: { category_name: req.body.category_name },
        include: { model: Product }
      });
      req.body.categoryByName = categoryByName;
    } else {
      res.status(400).send()
    }
    next();
  } catch { error => res.status(500) }
}

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: {
        model: Product
      }
    });
    res.status(200).send(categories)
  } catch { error => res.status(500) }
});

router.get('/:id', findTarget, async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    req.body.categoryById
      ? res.status(200).send(req.body.categoryById)
      : res.status(404).send('Error! Data Not Found')
  } catch { error => res.status(500) }
});

router.post('/', findTarget, async (req, res) => {
  // create a new category
  try {
    if (req.body.categoryByName) {
      res.status(405).send('Can not post duplicate data')
    } else {
      await Category.create(req.body);
      const newCategory = await Category.findOne({
        where: { category_name: req.body.category_name },
        include: { model: Product }
      })
      res.status(201).send(newCategory);
    }
  } catch { error => res.status(500) }
});

router.put('/:id', findTarget, async (req, res) => {
  // update a category by its `id` value
  try {
    if (req.body.categoryById) {
      await Category.update(
        { category_name: req.body.category_name },
        { where: { id: req.params.id } }
      )
      const updateCategory = await Category.findOne({
        where: { id: req.params.id },
        include: { model: Product }
      })
      res.status(200).send(updateCategory);
    } else {
      res.status(404).send('Error! Data Not Found')
    }
  } catch { error => res.status(500) }
});

router.delete('/:id', findTarget, async (req, res) => {
  // delete a category by its `id` value
  try {
    if (req.body.categoryById) {
      await Category.destroy({ where: { id: req.params.id } })
      res.status(204).send();
    } else {
      res.status(404).send('Error! Data Not Found')
    }
  } catch { error => res.status(500) }
});

module.exports = router;
