class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  before_action :authorize

  private 

  def authorize
    render json: {error: 'Not authorized'}, status: :unauthorized unless session.include? :user_id
  end

  def render_invalid(exception)
    render json: { exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
