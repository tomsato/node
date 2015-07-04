// 参考
// http://www.atmarkit.co.jp/ait/articles/1505/11/news015_2.html

var express = require('express');
var session = require('express-session');

// sessionを元にRedis Storeを取得
var RedisStore = require('connect-redis')(session);
var app = express();

app.use(session({
  store: new RedisStore({}),
  secret : 'secretKey'
}));

// ルーティング設定
app.get('/redis-store-counter', function(req, res) {
  var session = req.session;
  if (session && session.count) {
    session.count++;
  } else {
    session.count = 1;
  }
  res.send('count is ' + session.count);
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');

