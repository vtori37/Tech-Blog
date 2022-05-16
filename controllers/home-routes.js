// const sequelize = require('../config/connection');
// const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// getting all posts for homepage
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({

    // attributes: [
    //   'id',
    //   'post_text',
    //   'title',
    //   'created_at',
    // ],
    include: [
      {
        model: User,
        attributes: ['username']
      }//,
      // {
      //   model: Comment,
      //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      //   include: {
      //     model: User,
      //     attributes: ['username']
      //   }
      // },
    ]
  })
    .then((dbPostData) => {
      console.log(dbPostData[0]);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//gets single posts
router.get('/post/:id', (req, res) => {
  ///Post.findByPK
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post//,
        // loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//make signup router.gets
//put req.session.login; res.redirect('/home');; res.render, signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


// sent to dashboard
// router.get('/user/:id', withAuth, async (req, res) => {
//   try {
//     const dbUserData = await User.findByPk(req.session_user_id{
//       attributes: {
//         exclude: ["password"]
//       }
//     });

//     const user = dbUserData.get({ plain: true });

//     res.render('user', { user, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


module.exports = router;