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

        @inventaire = Inventaire.where(user_id: session[:user_id])
        objet_ids = @inventaire.pluck(:objet_id).uniq
        objets = Objet.where(id: objet_ids).sort_by(&:nom)

        @structured_inventaire = []

        objets.each do |objet|
            total_count = @inventaire.where(objet_id: objet.id).count
            while total_count > 0
                stack_count = [objet.stack.to_i, total_count].min
                @structured_inventaire << [objet, stack_count, objet.stack]
                total_count -= stack_count
            end
        end
    end
end
