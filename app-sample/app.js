var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// expressアプリケーションのインスタンスを作成
var app = express();

// expressの追加機能であるミドルウェアを読み込んでいる
//// staticミドルウェアはPOSTメソッドで送られてきたリクエストボディを解析し
//// JSONデータは自動的にオブジェクトにしてくれる
app.use(express.static('public'));
app.use(bodyParser.json());

// 3000番ポートで接続を待ち受ける
app.listen(3000);

// localhostのMongoDBのデータベース「test」に接続する
// コールバック引数のdatabaseにデータベースオブジェクトが返ってくる
var users;
mongodb.MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
  users = database.collection("users");
});

// 一覧取得
//// コレクションの一覧を配列で返す
//// users.find()でコレクション全体を取得
//// toArrayで配列に出力
//// $resourceのquery()に対応する部分
app.get("/api/users", function(req, res) {
  users.find().toArray(function(err, items) {
    res.send(items);
  });
});

// 個人取得
//// ドキュメントひとつを返す
//// 指定したObjectIdのドキュメントをusers.findOne()で取得し出力
//// ObjectIdは文字列型ではないので変換している
app.get("/api/users/:_id", function(req, res) {
  users.findOne({_id: mongodb.ObjectID(req.params._id)}, function(err, item) {
    res.send(item);
  });
});

// 追加・更新
//// リクエストボディに入っているJSONデータによってドキュメントを挿入、更新する
//// saveメソッドはidが存在しなければinsert、存在すればupdate
//// idは文字列型 -> ObjectId型に変換
app.post("/api/users", function(req, res) {
  var user = req.body;
  if (user._id) user._id = mongodb.ObjectID(user._id);
  users.save(user, function() {
    res.send("insert or update");
  });
});

// 削除
//// 指定したObjectIdのドキュメントを削除する
app.delete("/api/users/:_id", function(req, res) {
  users.remove({_id: mongodb.ObjectID(req.params._id)}, function() {
    res.send("delete");
  });
});


