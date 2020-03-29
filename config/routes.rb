# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  scope :api, constraints: { format: 'json' } do
    scope :v1 do
      devise_for :users

      resources :locations, only: %i[index show create update]
      resources :addresses, only: %i[index show create]
    end
  end
end
