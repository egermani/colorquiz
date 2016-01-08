class Spot < ActiveRecord::Base
  include Colorable
  
  belongs_to :image
  has_many :guesses
  has_and_belongs_to_many :quizzes, :through => :questions

  def calculate_par
    if guesses.count > 0
      (guesses.map {|guess| Colorable::deltas(guess, self)[:l].abs}.sum / guesses.count).round(2) 
    else
      "n/a"
    end
  end

  def distance
    # calculate euclidean distance from origin to determine numbering.
  end
end
