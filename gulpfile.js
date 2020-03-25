const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const del = require('del');
var browserSync = require('browser-sync').create();

//Последовательность
const cssFiles= [
    './src/css/main.css',
    './src/css/media.css'
]

//Таск на стили CSS
function styles(){
    //какие файлы будем обрабатывать
    return gulp.src(cssFiles)
    //объединение в один файл
    .pipe(concat('style.css'))
    //Добавление префиксов
    // .pipe(autoprefixer({
    //     // browsers: ['>0.1%'],
    //     cascade: false
    // }))
    .pipe(cleanCSS({level: 2}))
    //Указываем папку назначения
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}


const jsFiles= [
    './src/js/lib.js',
    './src/js/main.js'
]


function scripts(){
return gulp.src(jsFiles)
.pipe(concat('script.js'))
.pipe(uglify())
.pipe(gulp.dest('./build/js'))
.pipe(browserSync.stream());
}



function clean(){
    return del(['build/*'])
}

//Для автоматического изменения и вызова тасков
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/js/**/*.js', scripts )
    gulp.watch("/*.html").on('change', browserSync.reload);
}





//Вызываем
gulp.task('styles',styles)
gulp.task('scripts',scripts)
gulp.task('clean',clean)

//Для отслеживания изменений
gulp.task('watch', watch)

//Последовательное выполнение тасков
gulp.task('build',gulp.series(clean,gulp.parallel(styles,scripts)))
gulp.task('dev', gulp.series('build','watch'))