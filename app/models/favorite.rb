class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :location

  validates :user_id, presence: true, uniqueness: { scope: :location_id }
  validates :location_id, presence: true 

  validate :max_entries

  def max_entries 
    if Favorite.where(user_id: user_id).length > 5 
      errors.add(:user_id, :exceeded_15, message: 'Maximum saved areas is 15')
    end
  end

end
