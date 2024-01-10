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
        
        commun

        narration = Narrationpnj.find_by(user_id: session[:user_id])
        if narration
            if(narration.count < "5")
                session[:progression] = "lumina"
            end
        end

    end
    
    def lumina
        session[:progression] = "lumina"
        commun
      
        pnjzones = Pnjzone.where(zone: "lumina")
        @pnjs = pnjzones.map do |pnjzone|
            pnj = Pnj.find(pnjzone.pnj_id)
            reward_items = get_reward_items(pnj.reward_items)
            if peut_ajouter_objets?(session[:user_id], pnj.reward_items)
            ajouter_objet = false
            else
            ajouter_objet = true
            end
            [pnj.avatar, pnj.name, pnj.pv, pnj.vitesse, pnj.force, pnj.earn_xp, pnj.earn_money, reward_items, pnj.id, ajouter_objet]
        end
      
        zone_actuelle = 'lumina'
        quetes_zone = Quetezone.where(zone: zone_actuelle).pluck(:quete_id)
        quetes = Quete.where(id: quetes_zone)
        user_id = session[:user_id]
        
        @progressions_quetes = quetes.map do |quete|
            progression_quete = Progressionquete.find_by(user_id: user_id, quete_id: quete.id)
            
            if quete.id == 1
            # Logique pour la quête de fabrication
            casque_progression, armure_progression = progression_quete&.progression&.split(',')&.map(&:to_i) || [0, 0]
            progression_actuelle = casque_progression + armure_progression
            else
            # Logique pour les autres quêtes
            progression_actuelle = progression_quete ? progression_quete.progression.to_i : 0
            end
            
            accomplie = progression_quete ? progression_quete.accomplie : false
            { quete: quete, progression: progression_actuelle, accomplie: accomplie }
        end
      
        quetes_zone = Quetezone.where(zone: "lumina").pluck(:quete_id)
        toutes_quetes_accomplies = Progressionquete.where(quete_id: quetes_zone, user_id: session[:user_id], accomplie: "true").count == quetes_zone.count
      
        @afficher_fleche = toutes_quetes_accomplies
    end
    
    def valdara
        session[:progression] = "valdara"
        commun

        zone_actuelle = 'valdara'
        quetes_zone = Quetezone.where(zone: zone_actuelle).pluck(:quete_id)
        quetes = Quete.where(id: quetes_zone)
        user_id = session[:user_id]

        @progressions_quetes = quetes.map do |quete|
            progression_quete = Progressionquete.find_by(user_id: user_id, quete_id: quete.id)
            
            if quete.id == 1
            casque_progression, armure_progression = progression_quete&.progression&.split(',')&.map(&:to_i) || [0, 0]
            progression_actuelle = casque_progression + armure_progression
            else
            progression_actuelle = progression_quete ? progression_quete.progression.to_i : 0
            end
            
            accomplie = progression_quete ? progression_quete.accomplie : false
            { quete: quete, progression: progression_actuelle, accomplie: accomplie }
        end

        quetes_zone = Quetezone.where(zone: "valdara").pluck(:quete_id)
        toutes_quetes_accomplies = Progressionquete.where(quete_id: quetes_zone, user_id: session[:user_id], accomplie: "true").count == quetes_zone.count
      
        @afficher_fleche = toutes_quetes_accomplies

        objets_marche = Objet.where(caracteristique: ["achetable", "vendable", "achetable/vendable"])

        # Noms pour identifier les groupes spéciaux
        noms_pieces_or = ["Pièce d'or", "Sac de pièces d'or", "Gros sac de pièces d'or"]
        rarete_ordre = ["commun", "atypique", "rare", "épique", "légendaire"]
        
        # Séparez les objets en trois groupes
        groupes_objets = objets_marche.reject { |objet| noms_pieces_or.include?(objet.nom) || objet.nom.start_with?("Orbe") }
        groupes_pieces_or = objets_marche.select { |objet| noms_pieces_or.include?(objet.nom) }
        groupes_orbes = objets_marche.select { |objet| objet.nom.start_with?("Orbe") }
        
        # Triez les objets du groupe 'groupes_objets' par rareté
        groupes_objets = groupes_objets.sort_by { |objet| rarete_ordre.index(objet.rarete) || rarete_ordre.length }
        
        # Construisez le tableau final @objets_groupes avec ces trois groupes
        @objets_groupes = [groupes_objets, groupes_pieces_or, groupes_orbes]
    end

    def vallee
        session[:progression] = "vallee"
        commun

        pnjzones = Pnjzone.where(zone: "vallee")
        @pnjs = pnjzones.map do |pnjzone|
            pnj = Pnj.find(pnjzone.pnj_id)
            reward_items = get_reward_items(pnj.reward_items)
            if peut_ajouter_objets?(session[:user_id], pnj.reward_items)
            ajouter_objet = false
            else
            ajouter_objet = true
            end
            [pnj.avatar, pnj.name, pnj.pv, pnj.vitesse, pnj.force, pnj.earn_xp, pnj.earn_money, reward_items, pnj.id, ajouter_objet]
        end
    end

    def get_reward_items(reward_item_ids)
        return [] if reward_item_ids.blank?
        reward_item_ids.split(',').map do |item_with_quantity|
            item_parts = item_with_quantity.split('@')
            item_id = item_parts[0].to_i
            quantity = item_parts.length > 1 ? item_parts[1].to_i : 1
    
            objet = Objet.find_by(id: item_id)
            [objet, quantity] if objet
        end.compact
    end
    
    def commun
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

        if @narration.nil?
            @inventaire_joueur = Inventaire.where(user_id: session[:user_id])
            if @inventaire_joueur.empty?
                2.times do
                    Inventaire.create(objet_id: "39", user_id: session[:user_id])
                end
                10.times do
                    Inventaire.create(objet_id: "44", user_id: session[:user_id])
                end
            else
                if @inventaire_joueur.length == 1
                    Inventaire.find_by(user_id: session[:user_id]).destroy
                    2.times do
                        Inventaire.create(objet_id: "39", user_id: session[:user_id])
                    end
                    10.times do
                        Inventaire.create(objet_id: "44", user_id: session[:user_id])
                    end
                end
            end

            @inventaire_bois = Inventaire.where(objet_id: "39", user_id: session[:user_id])
            if @inventaire_bois.empty?
                2.times do
                    Inventaire.create(objet_id: "39", user_id: session[:user_id])
                end
            end
            @inventaire_fer = Inventaire.where(objet_id: "44", user_id: session[:user_id])
            if @inventaire_fer.empty?
                10.times do
                    Inventaire.create(objet_id: "44", user_id: session[:user_id])
                end
            end
        end

        classe_personnage = @personnage.classe.downcase # Assurer que la classe est en minuscules pour la comparaison

        @crafts = Craft.all
        @objets_craftables = Objet.where(id: @crafts.pluck(:objet_id).map(&:to_i)).index_by(&:id)

        # Filtrer les crafts en fonction de la classe du personnage
        crafts_filtrés = @crafts.select do |craft|
            objet_craftable = @objets_craftables[craft.objet_id.to_i]
            next false unless objet_craftable # Passer au suivant si l'objet n'existe pas
            nom_objet = objet_craftable.nom.split.first.downcase

            case nom_objet
            when 'lame'
                classe_personnage == 'assassin'
            when 'épée'
                classe_personnage == 'chevalier'
            when 'sceptre'
                classe_personnage == 'mage'
            else
                true # Autoriser tous les autres objets pour toutes les classes
            end
        end

        @materiaux_et_objets = {}
        crafts_filtrés.each do |craft|
            materiaux_non_vides = craft.materials.select { |_, quantite| quantite.to_i > 0 }
            objets_correspondants = Objet.where(nom: materiaux_non_vides.keys)

            @materiaux_et_objets[craft] = objets_correspondants.index_by(&:nom).transform_values do |objet|
                quantite = materiaux_non_vides[objet.nom]
                [objet, quantite]
            end
        end

        @quantites_totales = @inventaire.group(:objet_id).count

        @experience = Experience.find_by(user_id: session[:user_id])

        if @experience.present? && @personnage.present?
            current_level = @personnage.exp_joueur.to_i
            current_exp = @experience.points
            exp_prochain_niveau = points_requis_pour_niveau(current_level + 1)
    
            # Calculer la progression
            @progression_experience = if exp_prochain_niveau > 0
                                         (current_exp.to_f / exp_prochain_niveau.to_f) * 100
                                       else
                                         0
                                       end
            @points_exp_actuels = current_exp
            @points_exp_prochain_niveau = exp_prochain_niveau
        else
            @progression_experience = 0
            @points_exp_actuels = 0
            @points_exp_prochain_niveau = 0
        end
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

            narration = Narrationpnj.find_by(user_id: session[:user_id])

            if(narration.count == "2")
                narration.update(count: "3", user_id: session[:user_id])
            end

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

        inventaire_taille_actuelle = @structured_inventaire.count

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

    def crafterLobjet
        objet_id = params[:objet_id]
        materiaux = params[:materiaux].to_unsafe_h
        user_id = session[:user_id]
      
        noms_materiaux = materiaux.keys
      
        for i in 0..materiaux.length - 1 do
            id = materiaux[noms_materiaux[i]][0]
            nombre = materiaux[noms_materiaux[i]][1]
            for j in 0..nombre.to_i - 1 do
            Inventaire.find_by(objet_id: id, user_id: user_id).destroy
            end
        end
      
        inventaire = Inventaire.create(objet_id: objet_id, user_id: user_id)
        if inventaire.save
            @narration = Narrationpnj.find_by(user_id: session[:user_id])
            if @narration.nil?
            Narrationpnj.create(count: "1", user_id: session[:user_id])
            end
        
            mise_a_jour_progression_fabrication(objet_id, user_id)
            redirect_to jeu_play_path, notice: "L'objet a été crafté avec succès."
        else
            redirect_to jeu_play_path, notice: "Erreur"
        end
    end

    def objetSuppr
        objet_id = params[:objet_id]
        user_id = params[:user_id]

        narration = Narrationpnj.find_by(user_id: session[:user_id])

        if(narration.count.to_i < 4)
            redirect_to jeu_play_path
        else
            Inventaire.find_by(objet_id: objet_id, user_id: user_id).destroy
            redirect_back(fallback_location: root_path, notice: 'Objet supprimé avec succès.')
        end
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

    def narrationdeux
        @narration = Narrationpnj.find_by(user_id: session[:user_id])
        if @narration.count == "1"
            if @narration.update(count: "2", user_id: session[:user_id])
                redirect_to jeu_play_path
            else
                redirect_to jeu_play_path
            end
        end

    end

    def acheterObjet
        quantite = params[:quantite].to_i
        objet_id = params[:objet_id]
        argent = params[:argent].to_i
        user_id = session[:user_id]
        personnage = Personnage.find_by(id: session[:personnage_id])

        unless peut_ajouter_objets?(user_id, "#{objet_id}@#{quantite}")
            flash[:error] = "Pas assez de place dans le sac à dos."
            redirect_to jeu_valdara_path
            return
        end

        quete_id_fabrication = 5
        progression_quete = Progressionquete.find_or_initialize_by(user_id: user_id, quete_id: quete_id_fabrication)
        progression_quete.progression ||= "0"
        progression_actuelle = progression_quete.progression.to_i
        
        if personnage.argent.to_i >= argent
            personnage.argent = personnage.argent.to_i - argent
            
            for i in 1..quantite do
                Inventaire.create(objet_id: objet_id, user_id: user_id)
                
                if progression_actuelle < 3
                    progression_actuelle += 1
                end
            end
        
            progression_quete.progression = progression_actuelle.to_s
            if progression_actuelle >= 3
                progression_quete.accomplie = "true"
            end

            progression_quete.save
    
            if personnage.save
                flash[:success] = "Achat réussi."
                redirect_to jeu_valdara_path
            else
                flash[:error] = "Une erreur est survenue lors de l'enregistrement."
                redirect_to jeu_valdara_path
            end
        else
            flash[:error] = "Vous n'avez pas assez d'argent pour cet achat."
            redirect_to jeu_valdara_path
        end
    end
      
    def vendreObjet
        quantite = params[:quantite].to_i
        objet_id = params[:objet_id]
        argent = params[:total_vente].to_i
        user_id = session[:user_id]
        personnage = Personnage.find_by(id: session[:personnage_id])


        quete_id_fabrication = 6
        progression_quete = Progressionquete.find_or_initialize_by(user_id: user_id, quete_id: quete_id_fabrication)
        progression_quete.progression ||= "0"
        progression_actuelle = progression_quete.progression.to_i
    
        if Inventaire.where(objet_id: objet_id, user_id: user_id).count >= quantite
            personnage.argent = personnage.argent.to_i + argent
    
            quantite.times do
                inventaire = Inventaire.find_by(objet_id: objet_id, user_id: user_id)
                inventaire.destroy if inventaire

                if progression_actuelle < 5
                    progression_actuelle += 1
                end
            end
    
            progression_quete.progression = progression_actuelle.to_s
            if progression_actuelle >= 5
                progression_quete.accomplie = "true"
            end

            progression_quete.save

            if personnage.save
                flash[:success] = "Vente réussie."
                redirect_to jeu_valdara_path
            else
                flash[:error] = "Une erreur est survenue lors de l'enregistrement."
                redirect_to jeu_valdara_path
            end
        else
            flash[:error] = "Vous n'avez pas assez d'objets à vendre."
            redirect_to jeu_valdara_path
        end
    end
    

    def combat
        @personnage = Personnage.find_by(user_id: session[:user_id])
        @pnj = Pnj.find_by(id: params[:pnj_id])
        @request = Request.find_by(pnj_id: @pnj.id)
        @resolue = Requestresolue.find_by(id_request: @request.id, id_user: session[:user_id])
        @user = User.find_by(id: session[:user_id])
        @stats = Statsobetsequipe.find_by(user_id: session[:user_id])
    
        @pv_final = @personnage.pv.to_i + @stats.pv.to_i
        @force_final = @personnage.force.to_i + @stats.force.to_i
        @vitesse_final = @personnage.vitesse.to_i + @stats.vitesse.to_i
        @exp_joueur_final = @stats.exp_joueur.to_i
    
        narration = Narrationpnj.find_by(user_id: session[:user_id])
    
        if narration && narration.count == "3"
            narration.update(count: "4", user_id: session[:user_id])
        end

        @reward_items = []

        @pnj.reward_items.split(',').each do |item_with_quantity|
            item_parts = item_with_quantity.split('@') # Sépare l'ID de l'objet et la quantité
            item_id = item_parts[0].to_i
            quantity = item_parts.length > 1 ? item_parts[1].to_i : 1 # Quantité par défaut est 1
        
            objet = Objet.find_by(id: item_id)
            @reward_items << [objet, quantity] if objet
        end

        if peut_ajouter_objets?(session[:user_id], @pnj.reward_items)
            @ajouter_objet = false
        else
            @ajouter_objet = true
        end
    end

    def requestCheck
        @pnj = Pnj.find_by(id: params[:pnj_id])
        @request = Request.find_by(pnj_id: @pnj.id)
    
        # Vérifiez si la réponse est correcte
        reponse_correcte = @request.bonne_reponse == params[:id_reponse]
    
        # Trouver ou initialiser l'objet Requestresolue
        @resolue = Requestresolue.find_or_initialize_by(id_request: @request.id, id_user: session[:user_id])
    
        # Mettre à jour et sauvegarder l'attribut resolue
        @resolue.resolue = reponse_correcte ? "true" : "false"
        @resolue.save
    
        redirect_to jeu_combat_path(pnj_id: @pnj.id)
    end
    

    def recompenses
        @pnj = Pnj.find_by(id: params[:id])

        narration = Narrationpnj.find_by(user_id: session[:user_id])
        if narration && narration.count == "4"
            narration.update(count: "5", user_id: session[:user_id])
        end

        if peut_ajouter_objets?(session[:user_id], @pnj.reward_items)
            ajouter_items(@pnj.reward_items)
        end
        ajouter_money(@pnj.earn_money)
        ajouter_experiences(@pnj.earn_xp)

        progression = session[:progression]

        redirect_to send("jeu_#{progression}_path")
    end
    
    def ajouter_items(items)
        return if items.blank?

        user_id = session[:user_id]

        items.split(',').each do |item_with_quantity|
            item_parts = item_with_quantity.split('@')
            item_id = item_parts[0].to_i
            quantity = item_parts.length > 1 ? item_parts[1].to_i : 1
    
            quantity.times { Inventaire.create(objet_id: item_id, user_id: user_id) }
        end
    end
    
    def ajouter_money(money)
        @personnage = Personnage.find_by(user_id: session[:user_id])
        money_actuel = @personnage.argent.to_i
        nouvel_argent = money_actuel + money.to_i
        @personnage.update(argent: nouvel_argent.to_s)
    end
    

    def ajouter_experiences(points_gagnes)
        @personnage = Personnage.find_by(user_id: session[:user_id])
        @experience = Experience.find_or_create_by(user_id: session[:user_id])
        stats_xp = Statsobetsequipe.find_by(user_id: session[:user_id])

        xp_orbe = stats_xp.exp_joueur.to_i

        points_gagnes = points_gagnes.to_i

        if xp_orbe != 0
            bonus = (points_gagnes * xp_orbe) / 100.0
            points_gagnes += bonus
        end
        
        @experience.points += points_gagnes
    
        current_level = @personnage.exp_joueur.to_i

        while @experience.points >= points_requis_pour_niveau(current_level + 1)
            current_level += 1
            @personnage.update(exp_joueur: current_level.to_s)
            mettre_a_jour_stats_personnage(@personnage, current_level)
            @experience.points -= points_requis_pour_niveau(current_level)
            
            if current_level >= 10
                @personnage.update(sac_a_dos: "20")
            end
    
            if current_level >= 15
                if @personnage.classe == 'assassin'
                    @personnage.update(avatar: "/images/4.jpg")
                elsif @personnage.classe == 'chevalier'
                    @personnage.update(avatar: "/images/6.jpg")
                else
                    @personnage.update(avatar: "/images/8.jpg")
                end
            end

            if @experience.points < points_requis_pour_niveau(current_level + 1)
                break
            end
        end
    
        if @experience.points == points_requis_pour_niveau(current_level + 1)
            @experience.points = 0
        end
    
        @experience.save

        mettre_a_jour_exp_personnage
    end
    
    def mettre_a_jour_stats_personnage(personnage, niveau)
        case personnage.classe
        when "assassin"
            personnage.force = personnage.force.to_i + (15 * 1.2).to_i
            personnage.pv = personnage.pv.to_i + (5 * 1.0).to_i
            personnage.vitesse = personnage.vitesse.to_i + (10 * 1.2).to_i
        when "chevalier"
            personnage.force = personnage.force.to_i + (10 * 1.0).to_i
            personnage.pv = personnage.pv.to_i + (15 * 1.5).to_i
            personnage.vitesse = personnage.vitesse.to_i + (5 * 0.8).to_i
        when "mage"
            personnage.force = personnage.force.to_i + (15 * 1.2).to_i
            personnage.pv = personnage.pv.to_i + (10 * 1.1).to_i
            personnage.vitesse = personnage.vitesse.to_i + (10 * 0.9).to_i
        end
    
        personnage.save
    end
    
    def points_requis_pour_niveau(niveau)
        a = 0.8
        b = 3
        c = 15
        (a * niveau**b + c).to_i
    end

    def create_narration
        Narrationpnj.create(count: params[:count], user_id: session[:user_id])
    end

    def peut_ajouter_objets?(user_id, items)
        @personnage = Personnage.find_by(user_id: user_id)
        return false unless @personnage
    
        capacite_sac_a_dos = @personnage.sac_a_dos.to_i
        @inventaire = Inventaire.where(user_id: user_id)
        
        espace_occupe = calculer_espace_occupe(@inventaire)
        espace_disponible = capacite_sac_a_dos - espace_occupe
    
        espace_necessaire = items.split(',').sum do |item_with_quantity|
            item_parts = item_with_quantity.split('@')
            item_id = item_parts[0].to_i
            quantity = item_parts.length > 1 ? item_parts[1].to_i : 1
    
            objet = Objet.find(item_id)
            next 0 unless objet
    
            if objet.stack.to_i > 1 && @inventaire.exists?(objet_id: item_id)
                0
            else
                quantity
            end
        end
    
        espace_necessaire <= espace_disponible
    end
    
    def calculer_espace_occupe(inventaire)
        inventaire.group(:objet_id).count.sum do |objet_id, count|
            objet = Objet.find(objet_id)
            next 0 unless objet
    
            if objet.stack.to_i > 1
                (count.to_f / objet.stack.to_i).ceil
            else
                count
            end
        end
    end
    
    def mise_a_jour_progression_fabrication(objet_id, user_id)
        nom_objet = Objet.find(objet_id).nom
        objets_a_verifier1 = ["Casque léger amélioré", "Armure légère amélioré"]
        objets_a_verifier2 = ["Lame légère amélioré", "Épée légère amélioré", "Sceptre magique amélioré"]
        if objets_a_verifier1.include?(nom_objet)
            quete_id_fabrication = 1
            
            progression_quete = Progressionquete.find_or_initialize_by(user_id: user_id, quete_id: quete_id_fabrication)
            progression_quete.progression ||= "0,0"
            casque_progression, armure_progression = progression_quete.progression.split(',').map(&:to_i)
            
            casque_progression = 1 if nom_objet == "Casque léger amélioré"
            armure_progression = 1 if nom_objet == "Armure légère amélioré"
            
            progression_totale = casque_progression + armure_progression
            progression_quete.progression = "#{casque_progression},#{armure_progression}"
            progression_quete.accomplie = "true" if progression_totale >= 2
            progression_quete.save

        elsif objets_a_verifier2.include?(nom_objet)
            quete_id_fabrication = 3

            progression_quete = Progressionquete.find_or_initialize_by(user_id: user_id, quete_id: quete_id_fabrication)
            progression_quete.progression ||= "0"

            if progression_quete.progression.to_i < 1
                progression_quete.progression = "1"
                progression_quete.accomplie = "true"
                progression_quete.save
            end
        end
    end

    def mettre_a_jour_exp_personnage
        mise_a_jour_progression_quete(2)
        mise_a_jour_progression_quete(4)
    end
    
    def mise_a_jour_progression_quete(quete_id)
        niveau_actuel = @personnage.exp_joueur.to_i
        progression_niveau = Progressionquete.find_or_initialize_by(user_id: session[:user_id], quete_id: quete_id)
        objectif_niveau = Quete.find_by(id: quete_id).objectif.to_i
        
        progression_niveau.progression = [niveau_actuel, objectif_niveau].min.to_s
        progression_niveau.accomplie = (niveau_actuel >= objectif_niveau).to_s
        
        progression_niveau.save
    end
end