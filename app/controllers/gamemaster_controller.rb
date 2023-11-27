class GamemasterController < ApplicationController
    def new
        if session[:id_gamemaster]
            @gamemaster = Gamemaster.find_by(id: session[:id_gamemaster])
        end
    end

    def connexion
        gamemaster = Gamemaster.find_by(name: params[:name], password: params[:password])
        if gamemaster.present?
        session[:id_gamemaster] = gamemaster.id

        redirect_to gamemaster_index_path
        else
        render :connexion
        end
    end

    def deconnexion
        session[:id_gamemaster] = nil
        redirect_to gamemaster_connexion_path
    end

    def create
        @gamemaster = Gamemaster.new(gamemaster_params)
        if @gamemaster.save
            flash[:notice] = "succesfully created gamemaster user"

            redirect_to gamemaster_index_path
        else
            flash[:alert] = "User not created"
            render :new
        end
    end

    def index
        @users = User.all
        if session[:id_gamemaster]
            @gamemaster = Gamemaster.find_by(id: session[:id_gamemaster])
        end
    end

    def show
        @user = User.find(params[:id])
        @personnage = Personnage.find_by(user_id: params[:id])
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy

        @personnage = Personnage.find_by(user_id: params[:id])
        if @personnage
            @personnage.destroy
        end

        redirect_to gamemaster_index_path
    end


    def gamemaster_params
        params.require(:gamemaster).permit(:name, :password);
    end
end