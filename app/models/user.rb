class User < ApplicationRecord
  has_secure_password

  validates :username, presence: :true, length: { in: 3..30 }
  validates :password, length: { in: 6..16 }

  has_many :favorites
  has_many :locations, through: :favorites
  
end
