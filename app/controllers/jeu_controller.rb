class JeuController < ApplicationController
    def cinematic
        @user = User.find_by(id: session[:user_id])
    end
end
