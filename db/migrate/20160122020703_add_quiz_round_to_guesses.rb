class AddQuizRoundToGuesses < ActiveRecord::Migration
  def change
    add_reference :guesses, :quiz_round, index: true, foreign_key: true
  end
end
