Rails.application.routes.draw do
  get 'accueil/index'
  get 'register/new'
  get 'register/connexion'
  
  post 'register/create'
  post 'register/connexion'

  delete 'register/destroy'

  root 'accueil#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
