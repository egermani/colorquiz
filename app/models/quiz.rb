class Quiz < ActiveRecord::Base
  has_many :quiz_rounds
  has_many :questions, :dependent => :destroy
  has_many :spots, :through => :questions
  has_many :guesses, :through => :quiz_rounds

  def length
    image_sum = questions.where(questionable_type: "Image").map { |image| image.spots }.count.sum
    image_sum + questions.where(questionable_type: "Spot")
  end

  def next_question(id)
    questions.where("id > ?", id).first
  end

  def class_average(format)
    if format == "value"
      (guesses.value.map(&:l_delta).sum / guesses.value.count).round(2)
    else
      (guesses.color.map(&:delta).sum / guesses.color.count).round(2)
    end
  end
end
