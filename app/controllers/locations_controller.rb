class LocationsController < ApplicationController

  skip_before_action :authorize, only: :index

  def index 
    if params[:q]
      locations = Location.where("name ILIKE ?", "%#{params[:q]}%") ||
      Location.where("state ILIKE ?", "%#{params[:q]}%")
    else
    locations = Location.all
    end
    render json: locations
  end

end
