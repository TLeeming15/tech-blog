const router = require('express').Router();
const { Posts, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all raw posts
    let postDataArray = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Convert to javascript/json friendly posts
    postDataArray = postDataArray.map(post=>post.get({plain:true}))


    // Convert to Handlebars-each compatible at posts:postDataArray
    res.render('homepage', { 
      posts:postDataArray, 
      logged_in: req.session.logged_in 
    });

  } catch(err) {
    res.status(500).json(err)
  }

  //   // Serialize data so the template can read it
  //   const post = postData.map((post) => post.get({ plain: true }));

  //   // Pass serialized data and session flag into template
  //   res.render('homepage', { 
  //     posts, 
  //     logged_in: req.session.logged_in 
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comments,
          attributes: ['content', 'id'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });
        console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
