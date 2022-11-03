const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
const findTarget = async (req, res, next) => {
  try {
    if (req.params.id) {
      const tagById = await Tag.findOne({
        where: { id: req.params.id },
        include: { model: Product }
      });
      req.body.tagById = tagById;
    } else if (req.body.tag_name) {
      const tagByName = await Tag.findOne({
        where: { tag_name: req.body.tag_name },
        include: { model: Product }
      });
      req.body.tagByName = tagByName;
    } else {
      res.status(400).send()
    }
    next();
  } catch { error => res.status(500).send() }
}
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product }
    });
    res.status(200).send(tags)
  } catch { error => res.status(500).send() }
});

router.get('/:id', findTarget, (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    req.body.tagById
      ? res.status(200).send(req.body.tagById)
      : res.status(404).send('Error! Data Not Found')
  } catch { error => res.status(500).send() }
});

router.post('/', findTarget, async (req, res) => {
  // create a new tag
  try {
    if (req.body.tagByName) {
      res.status(405).send('Can not post duplicate data')
    } else {
      const newtag = await Tag.create(req.body);
      res.status(201).send(newtag);
    }
  } catch { error => res.status(500).send() }
});

router.put('/:id', findTarget, async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if (req.body.tagById) {
      await Tag.update(
        { tag_name: req.body.tag_name },
        { where: { id: req.params.id } }
      )
      const updateTag = await Tag.findOne({
        where: { id: req.params.id },
        include: { model: Product }
      })
      res.status(200).send(updateTag);
    } else {
      res.status(404).send('Error! Data Not Found')
    }
  } catch { error => res.status(500).send() }
});

router.delete('/:id', findTarget, async (req, res) => {
  // delete on tag by its `id` value
  try {
    if (req.body.tagById) {
      await Tag.destroy({ where: { id: req.params.id } })
      res.status(204).send();
    } else {
      res.status(404).send('Error! Data Not Found')
    }
  } catch { error => res.status(500).send() }
});

module.exports = router;
