Rails.application.routes.draw do
  root 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    get '/stops/nearby', to:'stops#nearby'
    get '/stops/buses', to:'stops#buses'
  end

end
