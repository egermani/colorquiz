class CreateSpots < ActiveRecord::Migration
  def change
    create_table :spots do |t|
      t.references :image
      t.string :color
      t.integer :x
      t.integer :y
      t.integer :radius

      t.timestamps null: false
    end
  end
end
