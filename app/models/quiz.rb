class Quiz < ActiveRecord::Base
  has_many :quiz_rounds
  has_many :questions, :dependent => :destroy
  has_many :spots, :through => :questions

  def length
    image_sum = questions.where(questionable_type: "Image").map { |image| image.spots }.count.sum
    image_sum + questions.where(questionable_type: "Spot")
  end

  def next_question(id)
    questions.where("id > ?", id).first
  end
end
