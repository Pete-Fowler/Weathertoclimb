class LocationsController < ApplicationController

  skip_before_action :authorize, only: :index

  def index 
    locations = Location.all
    render json: locations
  end

end
