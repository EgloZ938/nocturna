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
            if @objets
                @objets.destroy_all
            end
            @objetequipes = Objetequipe.where(user_id: session[:user_id])
            if @objetequipes
                Objetequipe.where(user_id: session[:user_id]).destroy_all
            end
            @statsobetsequipes = Statsobetsequipe.find_by(user_id: session[:user_id])
            if  @statsobetsequipes
                @statsobetsequipes.destroy
            end
            @narration = Narrationpnj.where(user_id: session[:user_id])
            if @narration
                @narration.destroy_all
            end
            @experience = Experience.find_by(user_id: session[:user_id])
            if @experience
                @experience.destroy
            end
            @resolue = Requestresolue.where(id_user: session[:user_id])
            if @resolue
                @resolue.destroy_all
            end
            @victoirepnj = VictoirePnj.where(id_user: session[:user_id])
            if @victoirepnj
                VictoirePnj.where(id_user: session[:user_id]).destroy_all
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