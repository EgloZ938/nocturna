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
        equipe_ids = Objetequipe.where(user_id: session[:user_id]).pluck(:objet_id)
    
        # Récupérer les objets équipés à partir de ces identifiants
        @equipe_objets = Objet.where(id: equipe_ids)
    
        # Initialiser les emplacements pour casque, armure, et arme
        @equipe_triee = [nil, nil, nil]
    
        @equipe_objets.each do |objet|
            nom_objet = objet.nom.split.first
            case nom_objet
            when 'Casque'
                @equipe_triee[0] = objet
            when 'Armure'
                @equipe_triee[1] = objet
            else
                @equipe_triee[2] = objet
            end
        end
    
        # Récupérer tous les objets pour les afficher dans l'inventaire
        objets = Objet.where(id: @inventaire.pluck(:objet_id).uniq).sort_by(&:nom)
    
        @structured_inventaire = []
    
        objets.each do |objet|
            total_count = @inventaire.where(objet_id: objet.id).count
            while total_count > 0
                stack_count = [objet.stack.to_i, total_count].min
                @structured_inventaire << [objet, stack_count, objet.stack]
                total_count -= stack_count
            end
        end

        total_pv_bonus = 0
        total_force_bonus = 0
        total_vitesse_bonus = 0
        total_exp_bonus = 0

        # Calcul des bonus des objets équipés
        @equipe_triee.each do |objet|
            next unless objet
            data = objet.data.split(': ')
            valeur = data[1].to_i
            case data[0]
            when "Point de vie"
                total_pv_bonus += valeur
            when "Point d'attaque"
                total_force_bonus += valeur
            end
        end

        # Calcul des PV et Force totaux après application des objets équipés
        pv_total_avec_objets = @personnage.pv.to_i + total_pv_bonus
        force_total_avec_objets = @personnage.force.to_i + total_force_bonus

        # Calcul des effets des orbes
        @inventaire.each do |item|
            objet = Objet.find(item.objet_id)
            next unless ["Orbe de vie", "Orbe de force", "Orbe de vitesse", "Orbe d'expérience"].include?(objet.nom)
            pourcentage = objet.data.split(': ').last.to_i
            case objet.nom
            when "Orbe de vie"
                total_pv_bonus += (pv_total_avec_objets * pourcentage / 100)
            when "Orbe de force"
                total_force_bonus += (force_total_avec_objets * pourcentage / 100)
            when "Orbe de vitesse"
                total_vitesse_bonus += (@personnage.vitesse.to_i * pourcentage / 100)
            when "Orbe d'expérience"
                total_exp_bonus += pourcentage
            end
        end

        # Mise à jour ou création de l'enregistrement dans statsobetsequipes
        stats = Statsobetsequipe.find_or_initialize_by(user_id: @user.id)
        stats.update(pv: total_pv_bonus.to_s, force: total_force_bonus.to_s, vitesse: total_vitesse_bonus.to_s, exp_joueur: total_exp_bonus.to_s)
        @stats = Statsobetsequipe.find_by(user_id: session[:user_id])

        @narration = Narrationpnj.find_by(user_id: session[:user_id])
    end
    

    def objetEquipe
        user_id = params[:user_id]
        nouvel_objet_id = params[:objet_id]
        nouvel_objet = Objet.find(nouvel_objet_id)
    
        # Déterminer le type d'objet (Casque, Armure ou Arme)
        type_objet = case nouvel_objet.nom.split.first
                     when 'Casque' then 'Casque'
                     when 'Armure' then 'Armure'
                     when 'Lame', 'Épée', 'Sceptre' then 'Arme'
                     else 'Autre'
                     end
    
        # Trouver et déséquiper l'objet actuel de même type, s'il y en a un
        objets_equipes_ids = Objetequipe.where(user_id: user_id).pluck(:objet_id)
        objets_equipes = Objet.where(id: objets_equipes_ids)
        objet_actuel_equipe = objets_equipes.find do |o| 
            type_actuel = case o.nom.split.first
                          when 'Lame', 'Épée', 'Sceptre' then 'Arme'
                          else o.nom.split.first
                          end
            type_actuel == type_objet
        end
    
        if objet_actuel_equipe
            # Créer un nouvel enregistrement d'inventaire pour l'objet déséquipé
            Inventaire.create!(user_id: user_id, objet_id: objet_actuel_equipe.id)
            # Supprimer l'objet actuel de la table Objetequipe
            Objetequipe.where(user_id: user_id, objet_id: objet_actuel_equipe.id).destroy_all
        end
    
        # Équiper le nouvel objet
        nouvel_objet_equipe = Objetequipe.create!(objet_id: nouvel_objet_id, user_id: user_id)
    
        if nouvel_objet_equipe
            # Supprimer un seul exemplaire de l'objet de l'inventaire
            Inventaire.find_by(user_id: user_id, objet_id: nouvel_objet_id).destroy
            redirect_to jeu_play_path
        else
            redirect_to jeu_play_path, alert: "Impossible d'équiper l'objet."
        end
    end
    
    def objetDesequipe
        user_id = params[:user_id]
        objet_id = params[:objet_id]
        personnage = Personnage.find_by(user_id: user_id)
    
        # Récupérer l'inventaire actuel et sa taille
        @inventaire = Inventaire.where(user_id: user_id)
        inventaire_taille_actuelle = @inventaire.count
    
        # Vérifier si l'inventaire est plein
        if inventaire_taille_actuelle >= personnage.sac_a_dos.to_i
            # Rediriger vers la page précédente avec un message d'erreur
            redirect_back(fallback_location: root_path, alert: 'Pas assez de place dans le sac à dos pour déséquiper cet objet.')
        else
            # Supprimer l'objet équipé
            Objetequipe.where(user_id: user_id, objet_id: objet_id).destroy_all
            Inventaire.create(user_id: user_id, objet_id: objet_id)
    
            # Rediriger vers la page précédente avec un message de succès
            redirect_back(fallback_location: root_path, notice: 'Objet déséquipé avec succès.')
        end
    end    


    def objetSuppr
        objet_id = params[:objet_id]
        user_id = params[:user_id]

        Inventaire.find_by(objet_id: objet_id, user_id: user_id).destroy

        redirect_back(fallback_location: root_path, notice: 'Objet supprimé avec succès.')
    end

    def objetSupprQuantite
        objet_id = params[:objet_id]
        user_id = params[:user_id]
        quantite = params[:quantite]

        for i in 1..quantite.to_i do
            Inventaire.find_by(objet_id: objet_id, user_id: user_id).destroy
        end

        redirect_back(fallback_location: root_path, notice: 'Objets supprimés avec succès.')
    end

    def create_narration
        Narrationpnj.create(count: params[:count], user_id: session[:user_id])
    end
end