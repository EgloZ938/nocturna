Rails.application.routes.draw do
  get 'accueil/index'
  get 'register/new'
  get 'register/connexion'
  get 'personnage/new'
  get 'personnage/create'

  post 'register/create'
  post 'register/connexion'
  post 'personnage/create'

  delete 'register/destroy'

  root 'accueil#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
