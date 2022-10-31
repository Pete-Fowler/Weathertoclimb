class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :coordinates
end
