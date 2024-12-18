class GamemasterController < ApplicationController
    before_action :set_gamemaster, only: [:index, :craft, :editCraft, :editItem, :editPnj, :editPnjZone, :editQuete, :editQueteZone, :editRequest, :erreurGiveItem, :giveItem, :item, :newCraft, :newItem, :newPnj, :newPnjZone, :newQuete, :newQueteZone, :newRequest, :pnj, :pnjZone, :quete, :queteZone, :request, :show, :showCraft, :showItem, :showPnj, :showQuete, :showRequest]
 
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
 
        @objets = Inventaire.where(user_id: params[:id])
        for i in 0..@objets.length - 1 do
            @objets[i].destroy
        end
 
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
        @personnage = Personnage.find_by(user_id: params[:user_id])
        capacite_sac_a_dos = @personnage.sac_a_dos.to_i
 
        objet_a_ajouter = Objet.find(params[:objet_id])
 
        if peut_ajouter_objet?(objet_a_ajouter, capacite_sac_a_dos)
            timestamp = Time.now.to_i
            inventaire = Inventaire.new(objet_id: params[:objet_id], user_id: params[:user_id])
 
            if inventaire.save
                redirect_to gamemaster_index_path
            end
        else
            redirect_to gamemaster_erreurGiveItem_path
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
 
    def craft
        @crafts = Craft.all
        @objets = Objet.where(id: @crafts.pluck(:objet_id)).index_by(&:id)
    end
 
    def editCraft
        @craft = Craft.find(params[:id])
        session[:craft_id] = @craft.id
    end
 
    def updateCraft
        @craft = Craft.find_by(id: session[:craft_id])
        if @craft.update(craft_params)
            session[:craft_id] = nil
            redirect_to gamemaster_craft_path
        end
    end
 
    def newCraft
        @craft = Craft.new
    end
 
    def showCraft
        @craft = Craft.find(params[:id])
    end
 
    def destroyCraft
        @craft = Craft.find(params[:id])
        if @craft
            @craft.destroy
        end
        redirect_to gamemaster_craft_path
    end
 
    def createCraft
        @craft = Craft.new(craft_params)
        if @craft.save
            redirect_to gamemaster_craft_path, notice: 'Le craft a été créé avec succès.'
        else
            render :new
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
   
    def editPnj
        @pnj = Pnj.find(params[:id])
        session[:pnj_id] = @pnj.id
    end
 
    def updatePnj
        @pnj = Pnj.find_by(id: session[:pnj_id])
        if @pnj.update(pnj_params)
            session[:pnj_id] = nil
            redirect_to gamemaster_pnj_path
        end
    end
 
    def destroyPnj
        @pnj = Pnj.find(params[:id])
        if @pnj
            @pnj.destroy
        end
        redirect_to gamemaster_pnj_path
    end
 
    def pnjZone
        @pnjzones = Pnjzone.all
    end
 
    def newPnjZone
        @pnjzone = Pnjzone.new
    end
 
    def createPnjZone
        @pnjzone = Pnjzone.new(pnjZone_params)
        if @pnjzone.save
            flash[:notice] = "succesfully created pnj zone"
            redirect_to gamemaster_pnjZone_path
        else
            flash[:alert] = "pnj zone not created"
            render :new
        end
    end
 
    def editPnjZone
        @pnjzone = Pnjzone.find(params[:id])
        session[:pnjzone_id] = @pnjzone.id
    end
 
    def updatePnjZone
        @pnjzone = Pnjzone.find_by(id: session[:pnjzone_id])
        if @pnjzone.update(pnjZone_params)
            session[:pnjzone_id] = nil
            redirect_to gamemaster_pnjZone_path
        end
    end
 
    def destroyPnjZone
        @pnjzone = Pnjzone.find(params[:id])
        if @pnjzone
            @pnjzone.destroy
        end
        redirect_to gamemaster_pnjZone_path
    end
 
    def newRequest
        @request = Request.new
    end
    
    def editRequest
        @request = Request.find(params[:id])
        session[:request_id] = @request.id
    end
 
    def updateRequest
        @request = Request.find_by(id: session[:request_id])
        if @request.update(request_params)
            session[:request_id] = nil
            redirect_to gamemaster_request_path
        end
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
 
    def quete
        @quetes = Quete.all
    end
 
    def newQuete
        @quete = Quete.new
    end
 
    def createQuete
        @quete = Quete.new(quete_params)
        if @quete.save
            flash[:notice] = "succesfully created quête"
            redirect_to gamemaster_quete_path
        else
            flash[:alert] = "quete not created"
            render :new
        end
    end
 
    def showQuete
        @quete = Quete.find(params[:id])
    end
 
    def editQuete
        @quete = Quete.find(params[:id])
        session[:quete_id] = @quete.id
    end
 
    def updateQuete
        @quete = Quete.find_by(id: session[:quete_id])
        if @quete.update(quete_params)
            session[:quete_id] = nil
            redirect_to gamemaster_quete_path
        end
    end
 
    def destroyQuete
        @quete = Quete.find(params[:id])
        if @quete
            @quete.destroy
        end
        redirect_to gamemaster_quete_path
    end
 
    def queteZone
        @quetezones = Quetezone.all
    end
 
    def newQueteZone
        @quetezone = Quetezone.new
    end
    
    def createQueteZone
        @quetezone = Quetezone.new(queteZone_params)
        if @quetezone.save
            flash[:notice] = "succesfully created quetezone"
            redirect_to gamemaster_queteZone_path
        else
            flash[:alert] = "queteZone not created"
            render :new
        end
    end
 
    def editQueteZone
        @quetezone = Quetezone.find(params[:id])
        session[:queteZone_id] = @quetezone.id
    end
 
    def updateQueteZone
        @quetezone = Quetezone.find_by(id: session[:queteZone_id])
        if @quetezone.update(queteZone_params)
            session[:queteZone_id] = nil
            redirect_to gamemaster_queteZone_path
        end
    end
 
    def destroyQueteZone
        @quetezone = Quetezone.find(params[:id])
        if @quetezone
            @quetezone.destroy
        end
        redirect_to gamemaster_queteZone_path
    end
 
    private
 
    def set_gamemaster
        @users = User.all
        if session[:id_gamemaster]
            @gamemaster = Gamemaster.find_by(id: session[:id_gamemaster])
        end
    end
 
    def craft_params
        params.require(:craft).permit(:objet_id, :quantite, materials: {})
    end
 
    def request_params
        params.require(:request).permit(:question, :reponse1, :reponse2, :reponse3, :reponse4, :bonne_reponse, :pnj_id)
    end
 
    def pnj_params
        params.require(:pnj).permit(:name, :avatar, :pv, :vitesse, :force, :earn_xp, :earn_money, :reward_items)
    end
 
    def pnjZone_params
        params.require(:pnjzone).permit(:pnj_id, :zone)
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
 
    def quete_params
        params.require(:quete).permit(:titre, :description, :recompenses, :objectif)
    end
 
    def queteZone_params
        params.require(:quetezone).permit(:quete_id, :zone)
    end
 
    def peut_ajouter_objet?(objet, capacite_sac_a_dos)
        total_stacks = 0
        @inventaire = Inventaire.where(user_id: params[:user_id])
        objet_ids = @inventaire.pluck(:objet_id).uniq
        equipe_ids = Objetequipe.where(user_id: params[:user_id]).pluck(:objet_id)
        
        objets_a_verifier_ids = objet_ids - equipe_ids
        objets = Objet.where(id: objets_a_verifier_ids).sort_by(&:nom)
 
        @structured_inventaire = []
 
        objets.each do |objet_inventaire|
            total_count = @inventaire.where(objet_id: objet_inventaire.id).count
            while total_count > 0
                stack_count = [objet_inventaire.stack.to_i, total_count].min
                @structured_inventaire << [objet_inventaire, stack_count, objet_inventaire.stack]
                total_count -= stack_count
            end
        end
 
        @structured_inventaire.each do |item|
            total_stacks += 1 if item[0].id != objet.id || item[1] == objet.stack.to_i
        end
    
        objet_existant = @structured_inventaire.find { |item| item[0].id == objet.id && item[1] < objet.stack.to_i }
        return true if objet_existant
    
        total_stacks < capacite_sac_a_dos
    end
 end