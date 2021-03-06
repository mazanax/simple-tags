# Simple Tags

A lightweight JS plugin for tags without JQuery library
![](http://demo.kurtobando.com/screencast/simple-tags.gif)

### Getting Started
Simply add the `data-simple-tags` with your desired values, for example `Article, Blog, Page, Post, Category, Updates` then, include `.simple-tags` for the default style.
```html
<div
   class="simple-tags"
   data-simple-tags="Article, Blog, Page, Post, Category, Updates">
</div>
```

NOTE!  Ensure these files are included on your project.
```html
<link href="build/css/style.css" rel="stylesheet">
<script src="build/js/script-min.js"></script>
```
In addition to this, the `data-simple-tags` will update whenever a new tag or deleted tag has been made. 

### Demo
Visit [here](https://demo.kurtobando.com/play-with-js/simple-tags)

### Installation
```bash
npm install 
npm run start
npm run build
```
### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 

Please make sure to update tests as appropriate.

### License
[MIT](https://choosealicense.com/licenses/mit/)
