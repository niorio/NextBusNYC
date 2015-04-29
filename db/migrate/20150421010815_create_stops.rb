class CreateStops < ActiveRecord::Migration
  def change
    create_table :stops do |t|
      t.string :name, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps
    end
    add_index :stops, [:latitude, :longitude]
  end
end
