let
gulp = require('gulp');

gulp.task('build',function(){
	let
	inlineNg2Template = require('gulp-inline-ng2-template'),
	sass = require('node-sass');

	gulp
		.src('src/**/*.ts')
		.pipe(inlineNg2Template({
			useRelativePaths: true,
			removeLineBreaks: true,
			styleProcessor: (path, ext, content, cb) => {
				try {
					let css = sass.renderSync({
						data: content
					}).css;
					cb(null, css);
				} catch (err) { cb(err); }
			},
		}))
		.pipe(gulp.dest('build/src'));

});
