class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :default_location, :admin

  has_many :favorites
end
