class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy]

  def index
    @images = Image.all
  end

  def show
    @round = Round.new()
    @image.spots.count.times { @round.guesses.build }
    @guesses = @round.guesses
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)

    respond_to do |format|
      if @image.save
        format.html { redirect_to @image, notice: 'Spot was successfully created.' }
        format.json { render :show, status: :created, location: @image }
      else
        format.html { render :new }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if request.xhr?
      p params
      # GOTTA GO THE OTHER WAY, otherwise we can't save anything
      incumbent_spots = Spot.where(image_id: params[:id])
      p incumbent_spots
      form_spots = params[:spot].each do |spot|
        p spot
        spot["image_id"] = params[:id].to_i
        spot["radius"] = spot["radius"].to_i
        spot["x"] = spot["x"].to_i
        spot["y"] = spot["y"].to_i
        unless incumbent_spots.map {|spot| spot.as_json(:except => [:id, :created_at, :updated_at])}
                              .include?(spot)
          strong_params = ActionController::Parameters.new(spot).permit(:image_id, :radius, :color, :x, :y)
          new_spot = Spot.new(strong_params)
          new_spot.save
        end
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
    params.require(:image).permit(:img, :user_id, :name)
  end

  def spot_params
    params.require(:spot).permit([:image_id, :color, :x, :y, :radius])
  end
end