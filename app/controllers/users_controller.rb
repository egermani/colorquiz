class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show]

  def show
  end

  def update
    respond_to do |format|
      if current_or_guest_user.update(user_params)
        format.html { redirect_to play_quiz_path(Quiz.find_by(name: "The Beta Quiz")) }
      else
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:years_active, :hours_per_week, :preferred_medium)
  end
end
