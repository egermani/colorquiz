class AddFormatColumnToGuesses < ActiveRecord::Migration
  def change
    add_column :guesses, :format, :string
  end
end
