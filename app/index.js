
var Generator = require('yeoman-generator'),
    chalk = require('chalk'),
    glob = require('glob'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path');




module.exports = class extends Generator {

    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        var dirs = glob.sync('+(web)');
        //now _.contains has been abandoned by lodash,use _.includes
        if (_.includes(dirs, 'web')) {
            this.log(chalk.bold.green('资源已经初始化，退出...'));
            setTimeout(function () {
                process.exit(1);
            }, 200);
        }

        //变量
        this.a = this.destinationRoot();
        this.log('根目录', this.a)
        this.b = this.sourceRoot();
        this.log('模板目录', this.b)
    }

    prompting() {

        var questions = require(this.b + '/configs/questionsConfig.json')
        /*问题的一些处理
        ***
        ***项目名字默认写成自己当前创建的文件夹
        */
        var appname = this.appname;
        _.map(questions, function (item) {
            if (item.name == 'projectName') {
                item.default = appname;
            }
            if (item.name == 'webType' || item.name == 'clientType') {  //只有是web时候才问选用的基础框架
                item.when = function (answers) {
                    console.log('hah', answers)
                    return answers.projectType == 'web' ? true : false
                };
            }
            return item
        })
        // console.log('questions', questions)
        return this.prompt(questions).then(
            function (answers) {
                console.log('我是answers', answers);
                for (var item in answers) {
                    console.log('我是answers item', item);
                    answers.hasOwnProperty(item) && (this[item] = answers[item]);
                }
            }.bind(this));
    }
    writing() {

        //copy templates
        var templatePath = this.projectType;
        if (this.webType && this.clientType) {
            templatePath = this.projectType + '/' + this.webType + '/' + this.clientType
        }

        this.fs.copy(
            this.templatePath(templatePath),  //根据user选择的类型拷贝不同模板-->web,electron...
            this.destinationPath(),
            { globOptions: { dot: true, ignore: ['**/node_modules/**', '**/.DS_Store'] } }  //拷贝包括点文件,忽略所有node_modules,.DS_Store文件
        );


    }
    install() {
        this.npmInstall();
    }
    end() {
        if (this.projectType == 'web') {
            this.spawnCommand('npm', ['start']);
        } else if (this.projectType == 'electron') {
            this.spawnCommand('npm', ['start']);
            setTimeout(() => {
                this.spawnCommandSync('osascript', ['-e', 'tell application "Terminal" to do script "echo newTerminal!"']) //osx打开新terminal跑脚本
                this.log('this.destinationRoot', this.destinationRoot())
                this.spawnCommandSync('cd', [this.destinationRoot()])
                this.spawnCommandSync('electron', ['.']);
            }, 10000)   //这里待优化

        }
    }
};