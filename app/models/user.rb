class User < ApplicationRecord
  has_secure_password
  has_many :favorites
  has_many :locations, through: :favorites
  
end
