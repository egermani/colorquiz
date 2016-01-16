class Spot < ActiveRecord::Base
  include Colorable
  
  belongs_to :image
  has_many :guesses
  has_many :questions, as: :questionable

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
