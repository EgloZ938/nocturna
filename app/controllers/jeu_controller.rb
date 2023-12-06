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
end
