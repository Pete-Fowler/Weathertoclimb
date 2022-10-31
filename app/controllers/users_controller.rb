class UsersController < ApplicationController
  skip_before_action :authorize, only: [:show]
  
  def show 
    user = User.find_by(id: session[:user_id])
    if user 
      render json: user
    else 
      render json: {error: 'Not authorized'}, status: :unauthorized
  end 

  def create 
    user = User.create!(user_params)
    
  end 

end
