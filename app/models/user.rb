class User < ApplicationRecord
  has_secure_password

  validates :username, presence: :true, numericality: { in: 3..30 }

  has_many :favorites
  has_many :locations, through: :favorites
  
end
