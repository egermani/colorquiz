class Spot < ActiveRecord::Base
  include Colorable
  
  belongs_to :image
  has_many :guesses
  has_and_belongs_to_many :quizzes

  def distance
    # calculate euclidean distance from origin to determine numbering.
  end
end
