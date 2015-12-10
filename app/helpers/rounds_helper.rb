module RoundsHelper
  def calculate_hue_delta(guess)
    delta = guess.hue - guess.spot.hue
    delta = (delta + 180) % 360 - 180
  end
end