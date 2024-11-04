module Api
  class UsersController < ApplicationController
    def index
      users = User.all
      render json: users
    end
  
    def create
      user = User.new(user_params)
      if user.save
        avatar_url = url_for(user.avatar) if user.avatar.attached?
        render json: { message: "ユーザー登録が成功しました", user: user, avatar_url: avatar_url }, status: :created  
      else
        render json: { errors: user.errors.full_messages }, status: :bad_request
      end
    end
  
    private
      def user_params
        params.require(:user).permit(:name, :email, :avatar, :password)
      end
  end
end