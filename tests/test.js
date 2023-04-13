const sequelize = require('../config/connection');
const { User, Posts } = require('../models');


const testDatabase = async () => {
  await sequelize.sync({ force: false });

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // for (const post of postData) {
  //   await Posts.create({
  //     ...post,
  //     user_id: 1
  //   });
  // }

    let postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    postData = postData.map(post=>post.get({plain:true}))
    console.log(postData);

  process.exit(0);
};

testDatabase();
