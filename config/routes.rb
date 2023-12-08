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
  get '/jeu/create'
  get '/jeu/play'
  get 'gamemaster/item'
  get 'gamemaster/createItem'
  get 'gamemaster/pnj'
  get 'gamemaster/createPnj'
  get 'gamemaster/newPnj'
  get 'gamemaster/showPnj'


  post 'register/create'
  post 'register/connexion'
  post 'personnage/new'
  post 'personnage/create'
  post 'gamemaster/new'
  post 'gamemaster/create'
  post 'gamemaster/connexion'
  post 'jeu/cinematic'
  post 'jeu/create'
  post 'gamemaster/item'
  post 'gamemaster/createItem'
  post 'gamemaster/createPnj'
  post 'gamemaster/newPnj'


  
  
  delete 'register/destroy'
  delete 'gamemaster/afficher/:id', to: 'gamemaster#destroy', as: 'delete'
  delete 'gamemaster/deconnexion'
  delete 'gamemaster/destroyPnj'
  
  root 'accueil#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
