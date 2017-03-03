// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.plugins = {
  autoReload: {enabled: true},
  babel: {
    presets: ['latest', 'react'],
    plugins: ['transform-object-rest-spread']
  },
  less: {},
  postcss: {
    processors: [
      require('autoprefixer')(['last 8 versions']),
      require('csswring')()
    ]
  }
};

// exports.hot = true;