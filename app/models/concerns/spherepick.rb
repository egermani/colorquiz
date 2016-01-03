def trial(start_point, radius = 10)
  min_dist = radius / 2
  new_origin = 
  x, y, z = 3.times.map {|blah| rand(-5..5)}
  puts x,y,z
  if (x*x + y*y + z*z) <= 25
    puts true
  else
    puts "nope"
  end
end

# 1.) An input color in the Lab space
# 2.) A maximum distance for distractors
# 3.) A minimum distance for distractors
# 4.) A minimum CIEdifference value for distractors

# Roll a 9 sided die. On a 1, offset is 0. On a 9, it's the minimum distance. If it's a zero, that means the original point will serve as the source. If not, some other point, which will be able to enclose the original color in its own sphere, will serve. (Find this item's lab number)
# Project a random point onto a sphere of this chosen radius.
# Now begin creating random points within our sphere (which will have a larger radius than the starting offset).
# For each
  # See if it's in the bounds of lab
  # Test their distance form all the previous points.
  # See what the cie difference is
# Once k points have been found satisfying these requirements, map these transformations onto the sphere's origin point.

# If this value is too close according to the CIElab formula, discard it
# If this value is out of the bounds of lab, then discard it.