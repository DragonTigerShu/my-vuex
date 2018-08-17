import Mock from 'mockjs';

const LoginUsers = [  // 模拟登录数据
    {id: 1,
      username : 'admin',
      password: '123456',
      avatar:'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
      name:'舒龙虎'
    }
];

const Users = [];

for (let i =0; i<86 ;i++) {
    Users.push(Mock.mock({
         id:Mock.Random.guid(),
         name: Mock.Random.cname(),
         addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
     }));
}

export {LoginUsers,Users};