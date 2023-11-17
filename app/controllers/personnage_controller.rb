class PersonnageController < ApplicationController
    def new
        @personnage = Personnage.new
    end

    def create
        @personnage = Personnage.new(personnage_params)
        session[:user_id] = @personnage.user_id
        if @personnage.classe == "chevalier"

        
        elsif @personnage.classe == "mage"
            

        elsif @personnage.classe = "assassin"
            

        else


        end
    end
    def personnage_params
        params.require(:personnage).permit(:avatar, :force, :experiece, :classe, :pv, :user_id)
    end
end