Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :books, only: %i[index create destroy] do
    member do
      patch :complete
    end
  end
  get "users/current_user", to: "users/current_user#index"
end