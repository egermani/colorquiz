class GameController < ApplicationController

  def splash
    @user = User.new
<<<<<<< Updated upstream
    render :layout => false
=======
    # render :layout => false
    redirect_to quiz_path(Quiz.find_by(name: "The Beta Quiz"))
>>>>>>> Stashed changes
  end
end
