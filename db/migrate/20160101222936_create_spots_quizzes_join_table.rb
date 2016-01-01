class CreateSpotsQuizzesJoinTable < ActiveRecord::Migration
  def change
    create_join_table :quizzes, :spots do |t|
      t.index [:quiz_id, :spot_id]
      t.index [:spot_id, :quiz_id]
    end
  end
end
