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

  def self.delta(c1, c2)
    c1 = c1.rgb
    c2 = c2.rgb
    ColorDifference::cie2000({r: c1.r, b: c1.b, g: c1.g},
              {r: c2.r, b: c2.b, g: c2.g})
  end
end