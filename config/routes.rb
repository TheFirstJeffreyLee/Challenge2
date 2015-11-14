Rails.application.routes.draw do
  get "/products" => "product#index"
end
