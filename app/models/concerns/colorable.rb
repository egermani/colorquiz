module Colorable
  include Color

  def stripped_hex
    color[1..-1]
  end

  def rgb
    r,g,b = stripped_hex.chars.each_slice(2).map {|pair| pair.join("").hex}
    RGB.new(r, g, b)
  end

  def lab
    rgb.to_lab
  end

  def hue
    r, g, b = rgb.r, rgb.g, rgb.b
    x = Math.atan2(Math.sqrt(3)* (g - b), 2 * r - g - b)
    x = (x > 0 ? x : (2*Math::PI + x)) * 360 / (2*Math::PI)
    x.round
  end

  def self.delta(c1, c2)
    c1 = c1.rgb
    c2 = c2.rgb
    scaled_score = ColorDifference::cie2000({r: c1.r, b: c1.b, g: c1.g},
              {r: c2.r, b: c2.b, g: c2.g}) * 100
    scaled_score.round(2)
  end

  def self.deltas(c1, c2)
    hue1 = c1.hue
    hue2 = c2.hue
    c1 = c1.rgb
    c2 = c2.rgb
    deltas = {}
    deltas[:l] = (c1.to_lab[0] - c2.to_lab[0]).round(1)
    deltas[:r] = (c1.r - c2.r).round
    deltas[:g] = (c1.g - c2.g).round
    deltas[:b] = (c1.b - c2.b).round
    deltas[:hue] = (hue1 - hue2).round
    return deltas
  end
end