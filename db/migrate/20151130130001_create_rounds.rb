class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.references :user
      t.references :image
      
      t.timestamps null: false
    end
  end
end
