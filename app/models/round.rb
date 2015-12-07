class Round < ActiveRecord::Base
  belongs_to :image
  belongs_to :user
  has_many :guesses

  accepts_nested_attributes_for :guesses
end
