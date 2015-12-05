class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :artist
      t.references :user
      t.integer :width
      t.integer :height
    end
  end
end
