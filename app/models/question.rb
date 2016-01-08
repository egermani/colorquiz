class Question < ActiveRecord::Base
  belongs_to :quiz
  belongs_to :spot

  scope :next, ->(id) { where("id > ?", id) }
end
