class JeuController < ApplicationController
    def cinematic
        @user = User.find_by(id: session[:user_id])
        @personnage = Personnage.find_by(id: session[:personnage_id])

        @cinematic = Cinematic.new
    end
    
    def create
        @cinematic = Cinematic.new(cinematic_params);
        if @cinematic.save
            flash[:notice] = "succesfully created personnage"
            redirect_to jeu_play_path
        end
    end

    def cinematic_params
        params.require(:cinematic).permit(:token, :user_id);
    end

    def play
        @user = User.find_by(id: session[:user_id])
        @personnage = Personnage.find_by(id: session[:personnage_id])
        @rangee = @personnage.sac_a_dos.to_i / 5

        @inventaire = Inventaire.find_by(personnage_id: session[:personnage_id])

        @objet = Objet.find_by(id: @inventaire.objet_id)

    end
end
