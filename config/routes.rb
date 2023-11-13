Rails.application.routes.draw do
  get 'accueil/index'
  get 'register/new'

  root 'accueil#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
