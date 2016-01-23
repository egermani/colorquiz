class GameController < ApplicationController

  def splash
    @user = User.new
    # redirect_to quiz_path(Quiz.find_by(name: "The Beta Quiz"))
    render 'quizzes/thanks', locals: {quiz_round: QuizRound.find(61)}
  end
end
