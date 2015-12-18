class Round < ActiveRecord::Base
  belongs_to :image
  belongs_to :user
  has_many :guesses, :dependent => :destroy

  accepts_nested_attributes_for :guesses

  def avg_score
    (guesses.map(&:delta).sum / guesses.count).round(2) 
  end
end
