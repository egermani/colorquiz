class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :guesses, foreign_key: "guesser_id"
  before_save :generate_name

  def generate_name
    self.name ||= email[0..email.index("@")-1]
  end
end
