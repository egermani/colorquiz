class CreateGuesses < ActiveRecord::Migration
  def change
    create_table :guesses do |t|
      t.references :spot
      t.string :color
      t.references :round
      t.references :guesser

      t.timestamps null: false
    end
  end
end
