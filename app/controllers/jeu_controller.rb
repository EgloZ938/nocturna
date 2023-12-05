class JeuController < ApplicationController
    def cinematic
        @user = User.find_by(id: session[:user_id])
        @personnage = Personnage.find_by(id: session[:personnage_id])
    end

    def play
        @user = User.find_by(id: session[:user_id])
        @personnage = Personnage.find_by(id: session[:personnage_id])
    end
end
