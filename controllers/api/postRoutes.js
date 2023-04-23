const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  // res.json({a:1});

    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id
    });

    if(newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(500).json({err:"Cannot create"})
    }
});
router.post('/:id/comments', withAuth, async (req, res) => {

  // post_id is req.params.id
  // user_id is req.session.user_id
  // req.body should include content if you did fetch code right

    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id
    });

    if(newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(500).json({err:"Cannot create"})
    }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
