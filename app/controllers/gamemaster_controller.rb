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

    def newItem
        @objet = Objet.new
    end

    def createItem
        @objet = Objet.new(item_params)
        if @objet.save
            redirect_to gamemaster_item_path
        end
    end

    def item
        @objets = Objet.all
    end

    def showItem
        @objet = Objet.find(params[:id])
    end

    def destroyItem
        @objet = Objet.find(params[:id])
        if @objet
            @objet.destroy
        end

        redirect_to gamemaster_item_path
    end

    def giveItem
        @test = params[:id]
        @objets = Objet.all
        @user = User.find(params[:id])
    end

    def giveItemUser
        inventaire = Inventaire.new(objet_id: params[:objet_id], user_id: params[:user_id])
        if inventaire.save
            redirect_to gamemaster_index_path
        end
    end

    def editItem
        @objet = Objet.find(params[:id])
        session[:objet_id] = @objet.id
    end

    def updateItem
        @objet = Objet.find_by(id: session[:objet_id])
        if @objet.update(item_params)
            session[:objet_id] = nil
            redirect_to gamemaster_item_path
        end
    end

    def newPnj
        @pnj = Pnj.new
    end
  
    def pnj
        @pnjs = Pnj.all
    end
  
    def showPnj
        @pnj = Pnj.find(params[:id])
    end
  
  
    def createPnj
        @pnj = Pnj.new(pnj_params)
        if @pnj.save
            flash[:notice] = "succesfully created pnj"

            redirect_to gamemaster_pnj_path
        else
            flash[:alert] = "pnj not created"
            render :new
        end
    end
   
    def destroyPnj
        @pnj = Pnj.find(params[:id])
        if @pnj
            @pnj.destroy
        end
    
        redirect_to gamemaster_pnj_path
    end

    def newRequest
        @request = Request.new
    end
    
    
    def showRequest
        @request = Request.find(params[:id])
    end
    
    
    def createRequest
        @request = Request.new(request_params)
        if @request.save
            flash[:notice] = "succesfully created request"
    
            redirect_to gamemaster_request_path
        else
            flash[:alert] = "request not created"
            render :new
        end
    end
    
    def destroyRequest
    
      @request = Request.find(params[:id])
      if @request
          @request.destroy
      end
    
      redirect_to gamemaster_request_path
    end
    
      def request_params
        params.require(:request).permit(:question, :reponse1, :reponse2, :reponse3, :reponse4, :bonne_reponse, :pnj_id)
      end

    def pnj_params
      params.require(:pnj).permit(:name, :classe, :avatar, :pv, :vitesse, :force, :earn_xp)
    end

    def item_params
        params.require(:objet).permit(:image, :nom, :rarete, :description, :caracteristique, :stack, :data)
    end

    def gamemaster_params
        params.require(:gamemaster).permit(:name, :password)
    end

    def giveItem_params
        params.require(:inventaire).permit(:objet_id, :user_id)
    end
end