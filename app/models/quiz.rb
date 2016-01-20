class Quiz < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  has_many :spots, :through => :questions

  def length
    image_sum = questions.where(questionable_type: "Image").map { |image| image.spots }.count.sum
    image_sum + questions.where(questionable_type: "Spot")
  end
end
