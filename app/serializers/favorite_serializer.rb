class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :location_id
end
