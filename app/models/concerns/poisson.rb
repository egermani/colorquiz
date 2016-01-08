# You can download this code from http://www.luma.co.za/labs/2008/02/27/poisson-disk-sampling.
# * Herman Tulleken (herman@luma.co.za).
#
#

# This module contains data structures useful for specific problems
# (they are not general-puspose containers).
module DataStructures
public

# A RandomQueue behaves like a queue (or a stack),
# except that the popped elements are randomly 
# selected.
#
# This class is useful for algorithms where
# elements must be processed in a random order.
  class RandomQueue
    
    # Constructs a new empty RandomQueue
    def initialize()
      @array = []
    end
    
    # Push a new element into the queue
    def push(x)
      @array.push(x)
    end
    
    # Pops a random element from the queue.
    def pop()    
      i = @array.length - 1    
      
      return @array.pop() if i < 1    
      
      j = rand(i)    
      @array[i], @array[j] = @array[j], @array[i]
      
      return @array.pop()
    end
    
    # Checks whether this queue is empty.
    def empty?()
      return @array.empty?()
    end    
  end

  # A 2D array that supports access through point-arrays.
  # For example: 
  #  x = 0, 2
  #  grid[x] = 5
  #
  # This class makes implementing 2D algorithms cleaner.
  class Grid
    #Returns the width of this grid
    def width ()
      return @width
    end
    
    # Returns the height for this grid.
    def height()
      return @height
    end   
    
    # Returns the internal array of arrays for this grid.
    def grid()
      return @grid
    end
    
    # Constructs a new grid with the given width and height, and fills it
    # with the given initial item.
    def initialize(width, height, initialItem=nil)
      @width = width
      @height = height
      @initialItem = initialItem
      @grid = Array.new(width, nil)
      
      width.times {|i| @grid[i] = Array.new(height, initialItem)}
    end
    
    # Returns the element at x, y = p. If x or y fall outside the legal range, 
    # the initial element is always returned.
    def [](p)
      x, y = p
      col = @grid[x]
      return @initialItem if (x < 0 or x >= @width or y < 0 or y >= @width)    
      return @grid[x][y]
    end
    
    #Sets the element at x, y = p.
    def []=(p, z)
      x, y = p
      return @grid[x][y] = z
    end
  end
end

# This module is used for generating Poisson samples.
module Poisson
private

  def uniform (a, b)
    return a + (b - a) * rand()
  end
  
  def int_point(p)
    x, y = p
    return [Integer(x), Integer(y)]
  end

public
  include DataStructures
  
  # Converts a set of points to a grid containing oneItems where the
  # grid position was present in the set, and zeroItems where not.
  # This is useful for creating images from point sets.
  def points_to_grid(points, width, height, zeroItem = 0, oneItem=1)
    grid = Grid.new(width, height, zeroItem)  
    points.each {|point| grid[int_point(point)] = oneItem}      
    return grid    
  end

  # Class for managing Poisson sampling. Although
  # this class can be used directly, the
  # method Poisson#sample should be used instead.
  class PoissonSampler
    
    # Constructs a new PoissonSampler that will sample a region
    # of the given width and height, with distance between
    # points no less than min_dist. The algorithm attempts to 
    # generate new_point_count points before moving on to the next point.
    def initialize(width, height, min_dist, new_point_count)
      @width = width
      @height = height
      @min_dist  = min_dist
      @min_dist_sqr = min_dist*min_dist
      @new_point_count = new_point_count     
      @inv_cell_size = Math.sqrt(2) / Float(min_dist)
      reset()
    end

private
  def range(range_array, x)
      return range_array[x] if range_array[x]
      
      range_array[x] = (x - 2)..(x + 2)
      return range_array[x]
    end
    
    def xrange_array()
      return @xrange_array
    end
    
    def yrange_array()
      return @yrange_array
    end
protected
    # Returns the width of the region to sample.
    def width()
      return @width
    end
    
    # Returns the height of the region to sample.
    def height()
      return @height
    end
    
    # Returns the list of points yet to be processed.
    def process_list()
      return @process_list
    end
    
    # Returns the list of points sampled so far.
    def sample_points()
      return @sample_points
    end
    
    # Returns the look-up grid.
    def grid
      return @grid
    end
    
    # Return the minimum distance allowed for this sampler.
    def min_dist()
      return @min_dist
    end
    
    # Returns the square of the minimum distance allowed for this sampler.
    def min_dist_sqr()
      return @min_dist_sqr
    end
    
    # Returns the reciprocal of the look-up grid's cell size
    def inv_cell_size()
      return @inv_cell_size
    end
    
    # Returns the number of new points to generate before processing the next point.
    def new_point_count()
      return @new_point_count
    end   
    
    # Resets all this class's internal containers.
    def reset()      
      @grid = Grid.new((width*@inv_cell_size).ceil, (height*@inv_cell_size).ceil)
      @process_list = RandomQueue.new()
      @sample_points = Array.new()
      @xrange_array = Array.new(width)
      @yrange_array = Array.new(height)
    end
    
    # Returns a range in the 'x'-neighbourhood of x.
    # Used to iterate over the indeces around and including a point.
    def xrange(x)
      return range(xrange_array, x)
    end
    
    # Returns a range in the 'y'-neighbourhood of y.
    # Used to iterate over the indeces around and including a point.
    def yrange(y)
      return range(yrange_array, y)
    end     

    # Convert sample coordinates to coordinates in the grid.
    def grid_coordinates(p)
      x, y = p
      return Integer(x*inv_cell_size), Integer(y*inv_cell_size)
    end

    # Puts a sample point in all the containers it should be in.
    def put_point(p)
      process_list.push(p)
      sample_points.push(p)  
      grid[grid_coordinates(p)] = p
    end  

    # Randomly generates a point around the given point,
    # so that the new point is between r and 2*r from
    # the given point.
    def generate_random_around(p, r)
      x, y = p
      rr = uniform(r, 2*r)
      rt = uniform(0, 2*Math::PI)
      
      return rr * Math.sin(rt) + x, rr * Math.cos(rt) + y
    end

    # Is this point in the rectangle provided in this
    # PoissonSampler's constructor?
    def in_rectangle?(p)
      x, y = p
      return ((0 <= x) and (x < width) and (0 <= y) and (y < height))
    end 

    # Returns the square distance between two given points.
    def sqr_dist(p0, p1)
      x0, y0 = p0
      x1, y1 = p1
      
      return (x1 - x0)*(x1 - x0) + (y1 - y0)*(y1 - y0)
    end  

    # Returns true if there are other points in the sample collection
    # too close to the given point.
    def others_in_neighbourhood?(p)
      gx, gy = gp = grid_coordinates(p)
     
      return true if grid[gp]
      xrange(gx).each { |i| yrange(gy).each { |j| 
        return true if grid[[i, j]] and (sqr_dist(grid[[i, j]], p) <= min_dist_sqr)
      }}
      return false
    end

public

    # Return the sample set for this PoissonSampler.
    # A new set is calculated every time this method is called.
    def sample()    
      put_point([rand(width), rand(height)])
      
      until process_list.empty?()
        p = process_list.pop()
        
        new_point_count.times { 
          q = generate_random_around(p, min_dist)
          put_point(q) if in_rectangle?(q) and not others_in_neighbourhood?(q)}
      end

      res = sample_points
      reset()
      return res 
    end
  end

public

  # Samples a rectangle width by height, such that elements
  # are at least distance r from each other. The number of
  # tries for each point under process is k. Usually, k = 30 is 
  # fine.
  def sample(width, height, r, k)
    sampler = PoissonSampler(width, height, r, k)
    return sampler.sample()
  end


  # A sample using the Poisson module.
  def demo()
    puts "***Begin Demo***"
    w = h = 512
    
    t1 = Time.now

    puts "Generating samples for a #{w} x #{h} grid."
    puts "Points at minimum 15 units from each other."
    puts "30 attempts are made to find surrounding points for every found sample point."
    
    p = PoissonSampler.new(w, h, 15, 30)
    s = p.sample()

    t2 = Time.now

    puts "Elapsed time in seconds ",  (t2.to_f - t1.to_f)
    print s.length, " points generated\n"
    puts "Converting the points to a grid..."
    grid = points_to_grid(s, w, h)
  
    puts "Writing grid to file poisson.dat..."
    file = File.new("poisson.dat", "w")
    file << grid.width << "\n"
    file << grid.height << "\n"

    grid.grid.each {|col| col.each {|p| file << p << "\n"}}

    file.close()
    puts "***End Demo***"
  end
end

# include Poisson
# Poisson.demo()
  