class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :location
  validates :user, presence: true
  validates :location, presence: true 
end
