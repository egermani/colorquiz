class Spot < ActiveRecord::Base
  include Colorable
  
  belongs_to :image
  has_many :guesses

  def distance
    # calculate euclidean distance from origin to determine numbering.
  end
end
