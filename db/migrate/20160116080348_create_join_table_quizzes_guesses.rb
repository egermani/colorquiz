class CreateJoinTableQuizzesGuesses < ActiveRecord::Migration
  def change
    create_join_table :quizzes, :guesses do |t|
      # t.index [:quiz_id, :guess_id]
      # t.index [:guess_id, :quiz_id]
    end
  end
end
