const gulp = require('gulp'); //加载或者引入gulp 生成gulp对象。
const html = require('gulp-minify-html'); //引入html的压缩的包
const css = require('gulp-minify-css'); //引入css的压缩的包
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plugins = require('gulp-load-plugins')();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块


//1.gulp.task(任务名,回调函数):创建新的任务。
//2.gulp.src('url'):引入文件的路径
//3.pipe 管道流
//4.gulp.dest():输出文件的路径，自动创建对应的文件名称。

// gulp.task('hehe',function(){
//     console.log('hello,gulp!!');
// });

//2.copy文件
gulp.task('copyfile', function () {
    return gulp.src('src/font/*')
        .pipe(gulp.dest('dist/font/'));
});

//3.html文件的压缩
gulp.task('uglifyhtml', function () {
    return gulp.src('src/*.html')
        .pipe(html()) //应用html包
        .pipe(gulp.dest('dist/'));
});

//4.压缩css。
gulp.task('uglifycss', function () {
    return gulp.src('src/css/*.css')
        .pipe(css()) //应用html包
        .pipe(gulp.dest('dist/css/'));
});

//5.利用sass，生成压缩css。
gulp.task('compilesass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(plugins.sourcemaps.init()) // 初始化 gulp-sourcemaps 插件  生成.map文件初始化  
        .pipe(plugins.sass({ // 调用 sass 插件，编译 sass 文件
            outputStyle: 'compressed' //压缩一行
        }))
        .pipe(plugins.sourcemaps.write('.')) // 生成 sourcemap 生成.map文件 
        .pipe(gulp.dest('dist/style/'));
});

//6.压缩js
gulp.task('uglifyjs', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({ //es6转es5
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

//6.png图片的压缩
//图片压缩的插件：gulp-imagemin
gulp.task('runimg', function () {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});


//最终监听
//每一个任务先跑一次，再进行监听
gulp.task('default',function(){
    //文件路径
    watch(['src/font/*','src/*.html','src/sass/*.scss','src/script/*.js','src/img/*.{png,jpg,gif,ico}'],gulp.parallel('copyfile','uglifyhtml','compilesass','uglifyjs','runimg'));//任务名
});

