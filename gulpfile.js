let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rigger = require('gulp-rigger'),
    path = {
      build: { //Тут мы укажем куда складывать готовые после сборки файлы
          html: 'app/'
        }};

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
          overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('imagemin', function(){
  gulp.src('app/images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()],
    interlaced: true
  }))
  .pipe(gulp.dest('app/images/'))
});

gulp.task('script', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'node_modules/wowjs/dist/wow.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
})

gulp.task('script-js', function(){
  return gulp.src(['app/js/main.js'])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('html:build', function () {
  gulp.src(['app/**/*.html'])
      .pipe(rigger()) //Прогоним через rigger
      .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
      .pipe(browserSync.reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('style', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css',
    'node_modules/normalize-css/normalize.css',
    'node_modules/animate.css/animate.css'
  ])
  .pipe(concat('libs.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('app/css'))
})

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true})) 
});

gulp.task('css', function(){
  return gulp.src('app/css/*.css')
  .pipe(browserSync.reload({stream: true})) 
});

gulp.task('js', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true})) 
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/css/*.css', gulp.parallel('css'));
  gulp.watch('app/js/*.js', gulp.parallel('js'));
  gulp.watch('app/images/**/*', gulp.parallel('imagemin'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      },
    // tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "budfy",
    browser: ["firefox"]
  });  
});



gulp.task('default', gulp.parallel('sass','browser-sync', 'script', 'html:build', 'script-js', 'style', 'imagemin', 'watch'))