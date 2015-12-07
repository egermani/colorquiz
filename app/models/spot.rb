class Spot < ActiveRecord::Base
  belongs_to :image

  def distance
    # calculate euclidean distance from origin to determine numbering.
  end
end
