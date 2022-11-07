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
      locations = Location.where(id: :ids)
    else
    locations = Location.all
    end
    render json: locations
  end

end
