class PersonnageController < ApplicationController
    def new
        @personnage = Personnage.new
        @test = session[:user_id]
    end

    def create

        @personnageExistant = Personnage.find_by(user_id: session[:user_id])
        if @personnageExistant
            @personnageExistant.destroy
        end

        @cinematicExistant = Cinematic.find_by(user_id: session[:user_id])
        if @cinematicExistant
            @cinematicExistant.destroy
        end

        personnage = Personnage.new(personnage_params)
        if personnage.save
            session[:personnage_id] = personnage.id
                flash[:notice] = "succesfully created personnage"
                redirect_to jeu_cinematic_path
        else
            flash[:alert] = "User not created"
            render :new
        end


    end
    def personnage_params
        params.require(:personnage).permit(:avatar, :avatar_unlock, :force, :exp_joueur, :classe, :inventaire, :sac_a_dos, :argent, :pv, :vitesse, :user_id);
    end
end