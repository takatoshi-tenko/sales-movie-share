Aws.config.update({
  region: 'tokyo',
  credentials: Aws::Credentials.new(
    ENV['AWS_ACCESS_KEY_ID'], 
    ENV['AWS_SECRET_ACCESS_KEY']
  )
})
