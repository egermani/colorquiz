class CreateQuizRounds < ActiveRecord::Migration
  def change
    create_table :quiz_rounds do |t|
      t.references :user, index: true, foreign_key: true
      t.references :quiz, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
