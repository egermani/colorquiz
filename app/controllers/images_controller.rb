class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy, :play]
  load_and_authorize_resource

  def index
    @images = Image.all
                   .sort_by { |image| [image.rounds.count, image.calculate_par] }
                   .reverse!
  end

  def show
    @round = Round.new()
  end

  def play
    @round = Round.new()
    @image.spots.count.times { @round.guesses.build }
    @guesses = @round.guesses
  end

  def new
    @image = Image.new
  end

  def edit
  end

  def create
    @image = Image.new(image_params)

    respond_to do |format|
      if @image.save
        format.html { redirect_to edit_image_path(@image), notice: 'Spot was successfully created.' }
        format.json { render :show, status: :created, location: @image }
      else
        format.html { render :new }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @image.update(image_params)
        format.html { redirect_to @image, notice: 'Spot was successfully updated.' }
        format.json { render :show, status: :ok, location: @image }
      else
        format.html { render :edit }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @image.destroy
    respond_to do |format|
      format.html { redirect_to images_url, notice: 'Spot was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_image
    @image = Image.find(params[:id])
  end

  def image_params
    params.require(:image).permit(:img, :user_id, :name, :spots_attributes => [:id, :color, :x, :y, :radius])
  end

  def spot_params
    params.require(:spot).permit([:image_id, :color, :x, :y, :radius])
  end
end