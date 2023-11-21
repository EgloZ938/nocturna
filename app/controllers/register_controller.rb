class RegisterController < ApplicationController
    def new
      @user = User.new
    end

    def create
      @user= User.new(user_params)

      if @user.save
        session[:user_id] = @user.id
          flash[:notice] = "succesfully created account"
          redirect_to root_path
      else
        flash[:alert] = "User not created"
        render :new

    end 
    
   end
   def destroy
      session[:user_id] = nil
      session[:personnage_id] = nil
      redirect_to register_connexion_path, notice: "logged out"
    end

   def connexion
     user = User.find_by(name: params[:name], password: params[:password])
     if user.present?
      session[:user_id] = user.id
      if @personnage
        @personnage = Personnage.find_by(user_id: session[:user_id])
        session[:personnage_id] = @personnage.id;
      end
      redirect_to root_path
     else
      render :connexion
     end
   end
     private

    def user_params
       params.require(:user).permit(:name, :password)
    end
end   
