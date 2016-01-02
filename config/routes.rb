Rails.application.routes.draw do
  devise_for :users
  get 'rounds/create'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'game#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  get 'images/:id/play' => 'images#play', as: :play_image
  get 'quizzes/:id/play' => 'quizzes#play', as: :play_quiz
  get 'game/result'
  post 'game/result'

  post 'images/:id/edit' => 'images#update', as: :update_image

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  get 'guesses/plm' => 'guesses#plm', as: :plm
  post 'guesses/palette' => 'guesses#create', as: :generate_palette
  get 'guesses/stats' => 'guesses#stats', as: :guess_stats
  get 'guesses/data', :defaults => { :format => 'json' }
  # Example resource route (maps HTTP verbs to controller actions automatically):
  resources :rounds
  resources :guesses
  resources :users, :only => :show
  resources :quizzes, :only => [:show, :index]
  
  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
    resources :images do
      resources :spots
    end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
