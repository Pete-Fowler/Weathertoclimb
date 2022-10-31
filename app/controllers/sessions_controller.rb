class SessionsController < ApplicationController
  # skip_before_action :authorize, only: [:create]

  def create 
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id 
      render json: user, status: :created
    else 
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end 

  def destroy = User.find_by(username: params[:username])
    session.delete :user_id
    render json: {}, status: :accepted
  end

  private

  def user_params 
    params.permit(:username, :password, :password_confirmation)
  end
end
