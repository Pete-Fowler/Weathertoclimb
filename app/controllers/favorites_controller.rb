class FavoritesController < ApplicationController

  def create favorites_params
    fav = Favorite.create!(favorites_params)
    render json: fav, status: :created
  end

  def destroy 
    fav = Favorite.find_by(id: params[:id])
    fav.destroy
    render json: {}, status: :accepted
  end

  private

  def favorites_params
    params.permit(:id, :user_id, :location_id)
  end
end
