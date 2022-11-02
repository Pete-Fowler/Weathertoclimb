class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :state
      t.string :coordinates
      t.string :forecast_url
      t.timestamps
    end
  end
end
