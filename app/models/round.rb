class Round < ActiveRecord::Base
  belongs_to :image
  belongs_to :user
end
