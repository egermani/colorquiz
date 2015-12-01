class User < ActiveRecord::Base
  has_many :guesses

  has_secure_password
end
