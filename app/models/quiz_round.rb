class QuizRound < ActiveRecord::Base
  belongs_to :user
  belongs_to :quiz
  has_many :guesses, :dependent => :destroy

  def avg_score(guesses, scoring)
    (guesses.map(&scoring).sum / guesses.count).round(2) 
  end
end
