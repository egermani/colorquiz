class Guess < ActiveRecord::Base
  include Colorable
  
  belongs_to :round
  belongs_to :guesser, :class_name => "User"
end
