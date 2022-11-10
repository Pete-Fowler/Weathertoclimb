class UsersController < ApplicationController
  skip_before_action :authorize, only: :create
  
  def show 
    render json: @current_user
  end

  def create 
    if(params[:username].length > 3 && params[:password].length.between?(6, 30))
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
    else 
      render json: {errors: ['Username or password is invalid']}, status: :unprocessable_entity
    end 
  end

  private 

  def user_params 
    params.permit(:username, :default_location, :password, :password_confirmation)
  end

end
