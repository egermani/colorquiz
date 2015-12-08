class AddDeltaColumnToGuesses < ActiveRecord::Migration
  def change
    add_column :guesses, :delta, :float
  end
end
