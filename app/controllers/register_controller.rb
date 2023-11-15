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

     private

    def user_params
       params.require(:user).permit(:name, :password)
    end
end