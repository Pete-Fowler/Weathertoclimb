class SessionsController < ApplicationController
  
  def create 
    user = User.find_by(username: params[:username])
    session[:user_id] = user.id 
    render json: user, status: :accepted
  end 

  def destroy = User.find_by(username: params[:username])
    session.delete :user_id
    render json: {}, status: :accepted
end
