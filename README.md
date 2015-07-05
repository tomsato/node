# tomsato / node

## 環境の準備
### create and ssh
```
mkdir tmhr_2015_01
cd tmhr_2015_01/
vagrant init chef/centos-6.5
vim Vagrantfile
vagrant up
vagrant ssh
```

### セットアップシェル
run.shに数時間時間がかかる  
run.sh実行時にエラーが出るのはそういうもの
```
$ vim tmp.sh
#!/bin/sh
sudo yum -y install git
git clone https://github.com/dotinstallres/centos65.git
cd centos65
./run.sh
sudo yum -y install vim
sudo npm update -g npm

$ sudo sh tmp.sh
```

### close
```
vagrant suspend
vagrant halt
```

## MEANスタックセットアップ

### node
```
$ sudo yum install nodejs npm --enablerepo=epel
```

### mongodb
```
$ sudo vim /etc/yum.repos.d/mongodb.repo
[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
$ sudo yum install -y mongodb-org
$ sudo service mongod start
$ sudo service mongod status
```
### gulp.js
```
$ sudo npm install -g gulp
```

### mean-cli
```
$ sudo npm install -g mean-cli

$ mean init testApp
$ cd testApp && npm install
$ cd testApp && bower install
$ cd testApp and then run..
$ gulp
```

### Memory Store
```
$ npm install express-session
```

### redis
```
$ sudo yum install redis
$ npm install connect-redis
$ npm install redis
```

