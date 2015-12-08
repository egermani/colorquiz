class Guess < ActiveRecord::Base
  include Colorable  
  belongs_to :round
  belongs_to :spot
  belongs_to :guesser, :class_name => "User"
  before_save :score

  def score
    self.delta ||= Colorable::delta(self, spot)
  end
end
