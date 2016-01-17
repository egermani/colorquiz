class AddQuestionableRefToQuestions < ActiveRecord::Migration
  def change
    add_reference :questions, :questionable, polymorphic: true, index: true
  end
end
