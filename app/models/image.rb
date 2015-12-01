class Image < ActiveRecord::Base
  has_many :rounds
  has_many :spots
end
