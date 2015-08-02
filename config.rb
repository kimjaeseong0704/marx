activate :autoprefixer do |config|
  config.browsers = ['last 2 versions']
end

activate :automatic_image_sizes

activate :livereload

set :relative_links, true

activate :directory_indexes

sprockets.append_path File.join root, 'source/javascripts'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

helpers do
  def nav_active(path)
    current_page.path == path ? {:class => "b-link--active"} : {}
  end
end

configure :build do
  activate :minify_css

  activate :minify_javascript

  activate :asset_hash

  activate :relative_assets

  activate :imageoptim

  activate :minify_html

  activate :gzip
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'gh-pages'
  deploy.build_before = true
end
