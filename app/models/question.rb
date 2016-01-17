class Question < ActiveRecord::Base
  belongs_to :quiz
  belongs_to :questionable, polymorphic: true

  scope :next, ->(id) { where("id > ?", id) }
end
