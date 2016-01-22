class QuizRound < ActiveRecord::Base
  belongs_to :user
  belongs_to :quiz
  has_many :guesses, :dependent => :destroy
end
