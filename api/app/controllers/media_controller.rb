# app/controllers/media_controller.rb
class MediaController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:create]

  def create
    uploaded_video = params[:video]
    uploaded_image = params[:image]

    # 動画ファイルの処理
    if uploaded_video.present?
      s3 = Aws::S3::Resource.new(region: 'ap-northeast-1')
      video_obj = s3.bucket('movie-share').object(uploaded_video.original_filename)
      video_obj.upload_file(uploaded_video.tempfile)
    end

    # 画像ファイルの処理
    if uploaded_image.present?
      s3 = Aws::S3::Resource.new(region: 'ap-northeast-1')
      image_obj = s3.bucket('movie-share').object(uploaded_image.original_filename)
      image_obj.upload_file(uploaded_image.tempfile)
    end

    # 成功した場合のレスポンス
    render json: { message: 'Files uploaded successfully' }, status: :created
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end
end
