class LocationsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]

  def show
    location = Location.find_by(id: params[:id])
    render json: location
  end

  def index
    if params[:q]
      locations = Location.where("name ILIKE ?", "%#{params[:q]}%")
    elsif params[:ids]
      id_array = params[:ids].split(',')
      locations = Location.where(id: id_array)
    else
    locations = Location.all
    end
    render json: locations
  end

  def create 
    location = Location.create!(location_params)
    render json: location, status: :created
  end

  def destroy 
    location = Location.find_by(id: params[:id])
    location.destroy
    render json: {}, status: :accepted
  end 

  private 

  def location_params 
    params.permit(:name, :state, :coordinates, :forecast_url, :popular)
  end
end
