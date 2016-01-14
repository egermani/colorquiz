class Guess < ActiveRecord::Base
  include Colorable  
  belongs_to :round
  belongs_to :spot
  belongs_to :guesser, :class_name => "User"
  before_save :score

  scope :value, -> { where(format: "value") }
  scope :color, -> { where(format: "color") }

  def score
    self.delta ||= Colorable::delta(self, spot)
  end

  def l_delta
    (Colorable::deltas(self, spot)[:l]).abs
  end
end
