# frozen_string_literal: true

# Communication layer for Addresses
class AddressesController < ApplicationController
  before_action :set_address, only: %i[show]
  before_action :authenticate_user, only: %i[create]

  # GET /api/v1/addresses.json
  def index
    render json: Address.all
  end

  # GET /api/v1/addresses/:id.json
  def show
    render json: { address: @address }
  end

  # POST /api/v1/addresses.json
  def create
    binding.pry
    @address = Address.new(address_params)

    if @address.save
      render json: { address: @address }, status: :created
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params.require(:address).permit(:street_address, :secondary_address, :city, :state, :zip_code, :notes)
  end
end
