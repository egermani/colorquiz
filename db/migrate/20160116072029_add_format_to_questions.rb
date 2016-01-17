class AddFormatToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :format, :string
  end
end
