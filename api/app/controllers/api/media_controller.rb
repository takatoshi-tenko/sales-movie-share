# app/controllers/media_controller.rb
require 'aws-sdk-s3'

module Api
  class MediaController < ApplicationController
    def create
      uploaded_video = params[:video]
      uploaded_image = params[:image]
  
      Aws.config.update({
        region: ENV['AWS_REGION'],
        credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
      })
  
      s3 = Aws::S3::Resource.new
      bucket = s3.bucket(ENV['AWS_BUCKET'])
  
      # 動画ファイルの処理
      if uploaded_video.present?
        video_obj = bucket.object(uploaded_video.original_filename)
        video_obj.upload_file(uploaded_video.tempfile)
      end
  
      # 画像ファイルの処理
      if uploaded_image.present?
        image_obj = bucket.object(uploaded_image.original_filename)
        image_obj.upload_file(uploaded_image.tempfile)
      end
  
      # 成功した場合のレスポンス
      render json: { message: 'Files uploaded successfully' }, status: :created
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  
    def show
      file_key = params[:file_key]
  
      Aws.config.update({
        region: ENV['AWS_REGION'],
        credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
      })
  
      s3 = Aws::S3::Client.new
      bucket_name = ENV['AWS_BUCKET']
  
      begin
        file = s3.get_object(bucket: bucket_name, key: file_key)
        send_data file.body.read, filename: file_key, disposition: 'inline'
      rescue Aws::S3::Errors::NoSuchKey
        render json: { error: 'File not found' }, status: :not_found
      end
    end
  end
end