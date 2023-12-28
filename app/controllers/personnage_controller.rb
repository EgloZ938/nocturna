class PersonnageController < ApplicationController
    def new
        @personnage = Personnage.new
        @test = session[:user_id]
    end

    def create

        @personnageExistant = Personnage.find_by(user_id: session[:user_id])
        if @personnageExistant
            @personnageExistant.destroy
            @objets = Inventaire.where(user_id: session[:user_id])
            for i in 0..@objets.length - 1 do
                @objets[i].destroy
            end
            @objetsequipes = Objetequipe.where(user_id: session[:user_id])
            for i in 0..@objetsequipes.length - 1 do
                @objetsequipes[i].destroy
            end
            @statsobetsequipes = Statsobetsequipe.find_by(user_id: session[:user_id])
            @statsobetsequipes.destroy
            @narration = Narrationpnj.where(user_id: session[:user_id])
            for i in 0..@narration.length - 1 do
                @narration[i].destroy
            end
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
        params.require(:personnage).permit(:avatar, :avatar_unlock, :force, :exp_joueur, :classe, :sac_a_dos, :argent, :pv, :vitesse, :user_id)
    end
end