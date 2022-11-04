class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :coordinates, :forecast_url
end
