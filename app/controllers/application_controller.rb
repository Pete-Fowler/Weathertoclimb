class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  before_action :authorize

  private 

  def authorize
    render json: {error: 'Not authorized'}, status: :unauthorized unless session.include? :user_id
  end

  def render_invalid(exception)
    render json: { exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end
end
