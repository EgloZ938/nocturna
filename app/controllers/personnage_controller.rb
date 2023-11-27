class PersonnageController < ApplicationController
    def new
        @personnage = Personnage.new
        @test = session[:user_id]
    end

    def create

        @personnage = Personnage.find_by(user_id: session[:user_id])
        if @personnage
            @personnage.destroy
            session[:personnage_id] = nil
        end

        @personnage = Personnage.new(personnage_params)
        if @personnage.save
            session[:personnage_id] = @personnage.id
                flash[:notice] = "succesfully created personnage"
        else
            flash[:alert] = "User not created"
            render :new
        end
    end
    def personnage_params
        params.require(:personnage).permit(:avatar, :avatar_unlock, :force, :exp_joueur, :classe, :inventaire, :sac_a_dos, :argent, :pv, :vitesse, :user_id);
    end
end