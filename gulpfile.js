const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const autoprefixer = require("autoprefixer");
const jsmin = require("gulp-jsmin");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const svgclear = require("gulp-cheerio");
const replace = require("gulp-replace");
const del = require("del");
const posthtml = require("gulp-posthtml");

// Styles

const clean = () => {
  return del("build");
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/*.ico",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
};

const cleanSprite = () => {
  return del("build/img/svg/forSprite");
}

exports.clean = cleanSprite;

exports.copy = copy;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml())
    .pipe(gulp.dest("build"));
}

exports.html = html;

const images = () => {
  return gulp.src("source/img/**/*.svg").pipe(imagemin([imagemin.svgo()]));
}

exports.images = images;

const webps = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("source/img"))
}

exports.webps = webps;

const sprite = () => {
  return gulp.src("source/img/svg/forSprite/*.svg")
    .pipe(svgclear({
      run: function ($) {
        $("[fill]").removeAttr("fill");
        $("[stroke]").removeAttr("stroke");
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img/sprite"))
}

exports.sprite = sprite;

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const stylesMin = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({suffix: "-min"}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.stylesMin = stylesMin;

const jsstyles = () => {
  return gulp.src("source/js/*.js")
    .pipe(jsmin())
    .pipe(rename({suffix: "-min"}))
    .pipe(gulp.dest("build/js"));
}

exports.jsstyles = jsstyles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.start = gulp.series(
  styles, server, watcher
);

exports.build = gulp.series(
  clean, copy, cleanSprite, html, styles, stylesMin, jsstyles
);
