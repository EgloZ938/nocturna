Rails.application.routes.draw do
  get 'accueil/index'
  get 'register/new'
  get 'register/connexion'
  get 'personnage/new'
  get 'personnage/create'
  get 'gamemaster/new'
  get 'gamemaster/create'
  get 'gamemaster/index'
  get 'gamemaster/connexion'
  get 'gamemaster/deconnexion'
  get '/gamemaster/afficher/:id', to: 'gamemaster#show', as: 'gamemaster'
  get '/jeu/cinematic'


  post 'register/create'
  post 'register/connexion'
  post 'personnage/new'
  post 'personnage/create'
  post 'gamemaster/new'
  post 'gamemaster/create'
  post 'gamemaster/connexion'

  delete 'register/destroy'
  delete 'gamemaster/afficher/:id', to: 'gamemaster#destroy', as: 'delete'
  delete 'gamemaster/deconnexion'

  root 'accueil#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
